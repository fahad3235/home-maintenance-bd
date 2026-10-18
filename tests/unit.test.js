/* home-maintenance-bd - node unit tests. Run: node tests/unit.test.js */
'use strict';
const L = require('../js/logic.js');
let passed = 0, failed = 0;
function check(name, cond, extra) {
  if (cond) { passed++; console.log('PASS ' + name); }
  else { failed++; console.log('FAIL ' + name + (extra ? ' :: ' + extra : '')); }
}
const TODAY = '2026-10-18';

// dates
check('isValidDate accepts 2026-02-28', L.isValidDate('2026-02-28') === true);
check('isValidDate rejects 2026-02-29 (non-leap)', L.isValidDate('2026-02-29') === false);
check('isValidDate accepts leap 2028-02-29', L.isValidDate('2028-02-29') === true);
check('isValidDate rejects bad month', L.isValidDate('2026-13-01') === false);
check('addDays 2026-10-18 +90 = 2027-01-16', L.addDays('2026-10-18', 90) === '2027-01-16');
check('addDays month boundary', L.addDays('2026-01-31', 1) === '2026-02-01');
check('daysBetween 10d', L.daysBetween('2026-10-18', '2026-10-28') === 10);
check('daysBetween negative', L.daysBetween('2026-10-18', '2026-10-10') === -8);

// nextDue / status
const ac = { id: 'a', name: 'AC service', category: 'appliance', intervalDays: 90, dueDate: null, lastDone: '2026-08-01', note: '', completed: false, active: true };
check('nextDue AC = 2026-10-30', L.nextDue(ac) === '2026-10-30', L.nextDue(ac));
check('status AC due-soon (12d out -> ok? 12>7)', L.statusOf(ac, TODAY) === 'ok', L.statusOf(ac, TODAY));
const acSoon = Object.assign({}, ac, { lastDone: '2026-07-25' }); // due 2026-10-23, 5d
check('nextDue AC soon = 2026-10-23', L.nextDue(acSoon) === '2026-10-23');
check('status due-soon', L.statusOf(acSoon, TODAY) === 'due-soon');
const acToday = Object.assign({}, ac, { lastDone: '2026-07-20' }); // due 2026-10-18
check('status due-today', L.statusOf(acToday, TODAY) === 'due-today');
const acOver = Object.assign({}, ac, { lastDone: '2026-07-01' }); // due 2026-09-29
check('status overdue', L.statusOf(acOver, TODAY) === 'overdue');
const fresh = Object.assign({}, ac, { lastDone: null });
check('status not-started when never done', L.statusOf(fresh, TODAY) === 'not-started');
check('nextDue null when never done', L.nextDue(fresh) === null);
const one = { id: 'o', name: 'Fix leak', category: 'plumbing', intervalDays: 0, dueDate: '2026-10-20', lastDone: null, note: '', completed: false, active: true };
check('one-time nextDue = dueDate', L.nextDue(one) === '2026-10-20');
check('one-time status due-soon', L.statusOf(one, TODAY) === 'due-soon');
const oneDone = Object.assign({}, one, { completed: true });
check('completed one-time status done', L.statusOf(oneDone, TODAY) === 'done');
check('completed one-time nextDue null', L.nextDue(oneDone) === null);

// markDone
const res = L.markDone(ac, '2026-10-18', 150000, 'log1');
check('markDone updates lastDone', res.task.lastDone === '2026-10-18');
check('markDone log fields', res.log.taskId === 'a' && res.log.date === '2026-10-18' && res.log.costPaisa === 150000);
check('markDone next due rolls forward', L.nextDue(res.task) === '2027-01-16');
const resOne = L.markDone(one, '2026-10-18', 50000, 'log2');
check('markDone one-time completes', resOne.task.completed === true);
check('markDone one-time log', resOne.log.costPaisa === 50000);

// money / digits
check('fmtMoney EN', L.fmtMoney(150000, 'en') === '\u09f31,500.00', L.fmtMoney(150000, 'en'));
check('fmtMoney BN digits', L.fmtMoney(150000, 'bn') === '\u09f3\u09e7,\u09eb\u09e6\u09e6.\u09e6\u09e6', L.fmtMoney(150000, 'bn'));
check('toBnDigits', L.toBnDigits('2026-10-18') === '\u09e8\u09e6\u09e8\u09ec-\u09e7\u09e6-\u09e7\u09ee');

// validation
check('validateTask ok', L.validateTask(ac, TODAY).ok === true);
check('validateTask empty name', L.validateTask(Object.assign({}, ac, { name: '  ' }), TODAY).ok === false);
check('validateTask bad category', L.validateTask(Object.assign({}, ac, { category: 'rocket' }), TODAY).ok === false);
check('validateTask negative interval', L.validateTask(Object.assign({}, ac, { intervalDays: -1 }), TODAY).ok === false);
check('validateTask one-time needs dueDate', L.validateTask(Object.assign({}, one, { dueDate: null }), TODAY).ok === false);
check('validateTask recurring must not carry dueDate', L.validateTask(Object.assign({}, ac, { dueDate: '2026-10-20' }), TODAY).ok === false);
check('validateTask future lastDone rejected', L.validateTask(Object.assign({}, ac, { lastDone: '2026-10-19' }), TODAY).ok === false);
check('validateTask long note rejected', L.validateTask(Object.assign({}, ac, { note: 'x'.repeat(501) }), TODAY).ok === false);

// import validation
const good = { app: 'home-maintenance-bd', version: 1, tasks: [ac], logs: [{ id: 'l1', taskId: 'a', date: '2026-10-18', costPaisa: 150000 }], lang: 'en' };
check('validateImport good', L.validateImport(good).ok === true);
check('validateImport wrong app', L.validateImport(Object.assign({}, good, { app: 'other' })).ok === false);
check('validateImport wrong version', L.validateImport(Object.assign({}, good, { version: 2 })).ok === false);
check('validateImport bad lang', L.validateImport(Object.assign({}, good, { lang: 'fr' })).ok === false);
check('validateImport dup task id', L.validateImport(Object.assign({}, good, { tasks: [ac, ac] })).ok === false);
check('validateImport orphan log', L.validateImport(Object.assign({}, good, { logs: [{ id: 'l9', taskId: 'zzz', date: '2026-10-18', costPaisa: 1 }] })).ok === false);
check('validateImport negative cost', L.validateImport(Object.assign({}, good, { logs: [{ id: 'l9', taskId: 'a', date: '2026-10-18', costPaisa: -1 }] })).ok === false);
check('validateImport task missing completed', L.validateImport(Object.assign({}, good, { tasks: [Object.assign({}, ac, { completed: undefined })] })).ok === false);

// summarize - scenario: AC overdue, one-time due-soon, fresh not-started; logs 1500 + 500
const tasks = [acOver, one, fresh];
const logs = [{ id: 'l1', taskId: 'a', date: '2026-10-18', costPaisa: 150000 }, { id: 'l2', taskId: 'o', date: '2025-01-01', costPaisa: 50000 }];
const s = L.summarize(tasks, logs, TODAY);
check('summarize total 3', s.total === 3);
check('summarize overdue 1', s.overdue === 1, JSON.stringify(s));
check('summarize dueSoon 1', s.dueSoon === 1);
check('summarize dueToday 0', s.dueToday === 0);
check('summarize next due = overdue AC', s.nextDueTask && s.nextDueTask.id === 'a');
check('summarize totalSpent 200000 paisa', s.totalSpent === 200000);
check('summarize spent12mo excludes 2025 log', s.spent12mo === 150000, String(s.spent12mo));
check('summarize byCategory appliance 150000', s.byCategory.appliance === 150000);
check('summarize byCategory plumbing 50000', s.byCategory.plumbing === 50000);
check('summarize paused excluded from overdue', (() => {
  const t2 = [Object.assign({}, acOver, { active: false })];
  const s2 = L.summarize(t2, [], TODAY);
  return s2.overdue === 0 && s2.active === 0;
})());

console.log('\n' + passed + ' passed, ' + failed + ' failed');
process.exit(failed ? 1 : 0);
