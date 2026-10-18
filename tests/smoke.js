/* home-maintenance-bd - headless-Chrome smoke test via raw CDP.
   Run: node tests/smoke.js [desktop|mobile]
   Uses /opt/meta-chromium/chrome + Node global WebSocket. No deps. */
'use strict';
const { spawn, execSync } = require('child_process');
const path = require('path');

const MODE = process.argv[2] || 'desktop';
const WIDTH = MODE === 'mobile' ? 390 : 1280;
const PORT = MODE === 'mobile' ? 9238 : 9237;
const DIR = path.resolve(__dirname, '..');
const URL = 'file://' + DIR + '/index.html?asof=2026-10-18';

let passed = 0, failed = 0;
function check(name, cond, extra) {
  if (cond) { passed++; console.log('PASS ' + name); }
  else { failed++; console.log('FAIL ' + name + (extra ? ' :: ' + extra : '')); }
}
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

class CDP {
  constructor(wsUrl) { this.ws = new WebSocket(wsUrl); this.id = 0; this.pending = new Map(); this.events = []; }
  async open() {
    await new Promise((res, rej) => { this.ws.onopen = res; this.ws.onerror = rej; });
    this.ws.onmessage = (m) => {
      const d = JSON.parse(m.data);
      if (d.id && this.pending.has(d.id)) {
        const { resolve, reject } = this.pending.get(d.id);
        this.pending.delete(d.id);
        d.error ? reject(new Error(JSON.stringify(d.error))) : resolve(d.result);
      } else this.events.push(d);
    };
  }
  send(method, params) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params: params || {} }));
    });
  }
  async evalExpr(expr) {
    const r = await this.send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error('eval exception: ' + JSON.stringify(r.exceptionDetails));
    return r.result.value;
  }
  close() { try { this.ws.close(); } catch (e) {} }
}

(async () => {
  const userDir = '/tmp/hm-chrome-' + MODE;
  execSync('rm -rf ' + userDir);
  const chrome = spawn('/opt/meta-chromium/chrome', [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--no-proxy-server',
    '--window-size=' + WIDTH + ',900',
    '--remote-debugging-port=' + PORT, '--user-data-dir=' + userDir, 'about:blank'
  ], { stdio: 'ignore' });
  let cdp = null;
  try {
    let targets = null;
    for (let i = 0; i < 50 && !targets; i++) {
      await sleep(200);
      try {
        const res = await fetch('http://127.0.0.1:' + PORT + '/json/list');
        const list = await res.json();
        targets = list.filter(t => t.type === 'page');
      } catch (e) { /* not up yet */ }
    }
    if (!targets || !targets.length) throw new Error('no page target');
    cdp = new CDP(targets[0].webSocketDebuggerUrl);
    await cdp.open();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Log.enable');
    await cdp.send('Network.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: WIDTH, height: 900, deviceScaleFactor: 1, mobile: MODE === 'mobile' });
    await cdp.send('Page.navigate', { url: URL });
    await sleep(1500);

    const errors = cdp.events.filter(e =>
      (e.method === 'Log.entryAdded' && e.params && e.params.entry && e.params.entry.level === 'error') ||
      e.method === 'Runtime.exceptionThrown');
    check('0 console/page errors', errors.length === 0, JSON.stringify(errors.slice(0, 2)));

    // 1. Initial render
    let v = await cdp.evalExpr(`({h1: document.querySelector('h1').textContent, empty: document.getElementById('noTasks').textContent})`);
    check('title renders', v.h1 === 'Home Maintenance BD', v.h1);
    check('empty tasks state', v.empty.indexOf('No tasks yet') === 0, v.empty);

    async function addTask(name, cat, interval, due, last) {
      return cdp.evalExpr(`(function(){
        document.getElementById('fName').value = ${JSON.stringify(name)};
        document.getElementById('fCategory').value = ${JSON.stringify(cat)};
        document.getElementById('fInterval').value = ${JSON.stringify(interval)};
        document.getElementById('fDue').value = ${JSON.stringify(due)};
        document.getElementById('fLast').value = ${JSON.stringify(last)};
        document.getElementById('taskForm').dispatchEvent(new Event('submit', {bubbles:true, cancelable:true}));
        return document.querySelectorAll('#taskList li').length;
      })()`);
    }

    // 2. Invalid task rejected inline (empty name)
    await cdp.evalExpr(`document.querySelector('[data-tab="tasks"]').click()`);
    await sleep(200);
    let n = await addTask('', 'appliance', '90', '', '');
    v = await cdp.evalExpr(`({err: document.getElementById('formError').textContent, rows: document.querySelectorAll('#taskList li').length})`);
    check('invalid task inline error', v.err.length > 0, v.err);
    check('no row added on invalid', v.rows === 0, String(v.rows));

    // 3. One-time task without due date rejected
    n = await addTask('Fix leak', 'plumbing', '0', '', '');
    v = await cdp.evalExpr(`({err: document.getElementById('formError').textContent, rows: document.querySelectorAll('#taskList li').length})`);
    check('one-time without due date rejected', v.err.length > 0 && v.rows === 0, v.err + '/' + v.rows);

    // 4. Add AC (recurring, last done 2026-07-01 -> due 2026-09-29, overdue) + one-time Fix leak due 2026-10-20
    n = await addTask('AC service', 'appliance', '90', '', '2026-07-01');
    check('add AC -> 1', n === 1, String(n));
    n = await addTask('Fix leak', 'plumbing', '0', '2026-10-20', '');
    check('add Fix leak -> 2', n === 2, String(n));

    // 5. Dashboard: overdue 1, due-soon 1, next due = AC service
    await cdp.evalExpr(`document.querySelector('[data-tab="dashboard"]').click()`);
    await sleep(300);
    v = await cdp.evalExpr(`({over: document.getElementById('dOverdue').textContent, soon: document.getElementById('dSoon').textContent, today: document.getElementById('dToday').textContent, next: document.getElementById('dNext').textContent})`);
    check('dashboard overdue 1', v.over === '1', v.over);
    check('dashboard due-soon 1', v.soon === '1', v.soon);
    check('dashboard due-today 0', v.today === '0', v.today);
    check('dashboard next due AC', v.next.indexOf('AC service') >= 0 && v.next.indexOf('2026-09-29') >= 0, v.next);

    // 6. Mark AC done with cost 1500 -> last done today, status ok, spent 1500
    await cdp.evalExpr(`document.querySelector('[data-tab="tasks"]').click()`);
    await sleep(200);
    await cdp.evalExpr(`document.querySelector('#taskList li [data-act="done"]').click()`);
    await sleep(200);
    await cdp.evalExpr(`(function(){
      document.getElementById('doneCost').value = '1500';
      document.querySelector('#taskList li [data-act="confirm-done"]').click();
    })()`);
    await sleep(400);
    v = await cdp.evalExpr(`({rows: document.querySelectorAll('#taskList li').length, hist: document.querySelectorAll('#histList li').length, spent: document.getElementById('dSpentAll').textContent})`);
    check('done keeps 2 tasks', v.rows === 2, String(v.rows));
    check('history has 1 record', v.hist === 1, String(v.hist));
    await cdp.evalExpr(`document.querySelector('[data-tab="dashboard"]').click()`);
    await sleep(200);
    v = await cdp.evalExpr(`({over: document.getElementById('dOverdue').textContent, spent: document.getElementById('dSpentAll').textContent})`);
    check('after done overdue 0', v.over === '0', v.over);
    check('after done spent 1500.00', v.spent.indexOf('1,500.00') >= 0, v.spent);

    // 7. BN toggle: title Bengali + Bengali digits
    await cdp.evalExpr(`document.getElementById('langBtn').click()`);
    await sleep(300);
    v = await cdp.evalExpr(`({h1: document.querySelector('h1').textContent, spent: document.getElementById('dSpentAll').textContent})`);
    check('BN title renders', v.h1.indexOf('\u09b9\u09cb\u09ae') >= 0, v.h1);
    check('BN digits in spent', /[\u09e6-\u09ef]/.test(v.spent), v.spent);
    await cdp.evalExpr(`document.getElementById('langBtn').click()`);
    await sleep(300);

    // 8. Reload persistence
    await cdp.send('Page.reload');
    await sleep(1500);
    v = await cdp.evalExpr(`document.querySelectorAll('#taskList li').length`);
    check('reload persists 2 tasks', v === 2, String(v));

    // 9. Export round-trip: erase then restore from stored state
    const exported = await cdp.evalExpr(`localStorage.getItem('home-maintenance-bd:v1')`);
    check('export state stored', !!exported && exported.indexOf('AC service') >= 0, String(exported).slice(0, 60));
    await cdp.evalExpr(`document.querySelector('[data-tab="data"]').click()`);
    await sleep(200);
    await cdp.evalExpr(`(function(){ document.getElementById('eraseInput').value = 'DELETE'; document.getElementById('eraseBtn').click(); })()`);
    await sleep(300);
    v = await cdp.evalExpr(`document.querySelectorAll('#taskList li').length`);
    check('erase -> 0 tasks', v === 0, String(v));
    const restored = await cdp.evalExpr(`(function(){
      var res = window.HMLogic.validateImport(JSON.parse(${JSON.stringify(exported)}));
      if (res.ok) { localStorage.setItem('home-maintenance-bd:v1', ${JSON.stringify(exported)}); location.reload(); return 'ok'; }
      return 'bad';
    })()`);
    await sleep(1500);
    v = await cdp.evalExpr(`document.querySelectorAll('#taskList li').length`);
    check('import round-trip restores 2', restored === 'ok' && v === 2, restored + '/' + v);

    // 10. Malformed import rejected with data intact
    const badRes = await cdp.evalExpr(`window.HMLogic.validateImport({app:'home-maintenance-bd',version:1,tasks:[{id:'x',name:'Bad',category:'appliance',intervalDays:-1,dueDate:null,lastDone:null,note:'',completed:false,active:true}],logs:[],lang:'en'}).ok`);
    check('malformed import rejected', badRes === false);
    v = await cdp.evalExpr(`document.querySelectorAll('#taskList li').length`);
    check('data intact after bad import', v === 2, String(v));

    // 11. 390px overflow (mobile only)
    if (MODE === 'mobile') {
      const overflow = await cdp.evalExpr(`document.documentElement.scrollWidth <= 390`);
      check('390px no horizontal overflow', overflow === true, 'scrollWidth=' + await cdp.evalExpr(`document.documentElement.scrollWidth`));
    }

    // 12. Zero network requests (file:// only)
    const reqs = cdp.events.filter(e => e.method === 'Network.requestWillBeSent' && e.params && e.params.request && !e.params.request.url.startsWith('file://') && !e.params.request.url.startsWith('data:'));
    check('zero network requests', reqs.length === 0, JSON.stringify(reqs.slice(0, 2)));
  } finally {
    if (cdp) cdp.close();
    chrome.kill();
  }
  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  process.exit(failed ? 1 : 0);
})().catch((e) => { console.error('HARNESS ERROR', e); process.exit(1); });
