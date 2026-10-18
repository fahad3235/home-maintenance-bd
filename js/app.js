/* home-maintenance-bd - UI. All user-visible strings live here (EN + BN). */
'use strict';
const L = window.HMLogic;

const STR = {
  en: {
    title: 'Home Maintenance BD',
    subtitle: 'Track household upkeep: service schedules, due dates and repair costs.',
    tabs: ['Dashboard', 'Tasks', 'History', 'Data'],
    dashTotal: 'Total tasks', dashActive: 'Active', dashOverdue: 'Overdue', dashToday: 'Due today',
    dashSoon: 'Due in 7 days', dashSpent: 'Spent (12 months)', dashSpentAll: 'Spent (all time)',
    dashNext: 'Next due', dashNone: 'Nothing scheduled',
    addTask: 'Add task', name: 'Task name', category: 'Category', interval: 'Repeat every (days)',
    intervalHint: '0 = one-time task (use due date below).', dueDate: 'Due date (one-time only)',
    lastDone: 'Last done (optional)', note: 'Note (optional)', save: 'Save task', cancel: 'Cancel',
    edit: 'Edit', del: 'Delete', done: 'Mark done', doneDate: 'Done date', doneCost: 'Cost (BDT)',
    confirmDone: 'Confirm', deactivate: 'Pause', activate: 'Resume',
    search: 'Search tasks', filterStatus: 'Status', filterCat: 'Category', all: 'All',
    emptyTasks: 'No tasks yet. Add your first maintenance task above.',
    emptyHist: 'No service records yet. Mark a task done to log it here.',
    histTitle: 'Service history', histTask: 'Task', histDate: 'Date', histCost: 'Cost',
    totalSpentLabel: 'Total spent', perTask: 'Spend per task', perCat: 'Spend per category',
    export: 'Export JSON', import: 'Import JSON', erase: 'Erase all data',
    eraseHint: 'Type DELETE to erase everything.', erased: 'All data erased.',
    importOk: 'Import OK.', importBad: 'Import rejected: invalid file.',
    formError: 'Please fix the highlighted fields.',
    langBtn: '\u09ac\u09be\u0982\u09b2\u09be',
    status: { overdue: 'Overdue', 'due-today': 'Due today', 'due-soon': 'Due soon', ok: 'On track', 'not-started': 'Not started', done: 'Done' },
    cat: { appliance: 'Appliance', plumbing: 'Plumbing', electrical: 'Electrical', cleaning: 'Cleaning', safety: 'Safety', other: 'Other' },
    dueLabel: 'Due', lastLabel: 'Last done', never: 'Never', daysOverdue: 'days overdue', inDays: 'in days',
    footer: 'Offline personal tracker. Dates and costs are your own records \u2014 not a contractor or warranty service.',
  },
  bn: {
    title: '\u09b9\u09cb\u09ae \u09ae\u09c7\u0987\u09a8\u099f\u09c7\u09a8\u09be\u09a8\u09cd\u09b8 \u09ac\u09bf\u09a1\u09bf',
    subtitle: '\u09ac\u09be\u09a1\u09bc\u09bf\u09b0 \u09b0\u0995\u09cd\u09b7\u09a3\u09be\u09ac\u09c7\u0995\u09cd\u09b7\u09a3 \u099f\u09cd\u09b0\u09cd\u09af\u09be\u0995 \u0995\u09b0\u09c1\u09a8: \u09b8\u09be\u09b0\u09cd\u09ad\u09bf\u09b8\u09c7\u09b0 \u09b8\u09ae\u09af\u09bc\u09b8\u09c2\u099a\u09bf, \u09ae\u09c7\u09af\u09bc\u09be\u09a6 \u0993 \u09ae\u09c7\u09b0\u09be\u09ae\u09a4 \u0996\u09b0\u099a\u0964',
    tabs: ['\u09a1\u09cd\u09af\u09be\u09b6\u09ac\u09cb\u09b0\u09cd\u09a1', '\u0995\u09be\u099c', '\u0987\u09a4\u09bf\u09b9\u09be\u09b8', '\u09a1\u09c7\u099f\u09be'],
    dashTotal: '\u09ae\u09cb\u099f \u0995\u09be\u099c', dashActive: '\u09b8\u099a\u09b2', dashOverdue: '\u09ae\u09c7\u09af\u09bc\u09be\u09a6\u09a6\u09c1\u09a4\u09cd\u09a4\u09c0\u09b0\u09cd\u09a3', dashToday: '\u0986\u099c\u0995\u09c7 \u09ae\u09c7\u09af\u09bc\u09be\u09a6',
    dashSoon: '\u09ed \u09a6\u09bf\u09a8\u09c7\u09b0 \u09ae\u09a7\u09cd\u09af\u09c7 \u09ae\u09c7\u09af\u09bc\u09be\u09a6', dashSpent: '\u0996\u09b0\u099a (\u09e7\u09e8 \u09ae\u09be\u09b8)', dashSpentAll: '\u0996\u09b0\u099a (\u09b8\u09ac \u09b8\u09ae\u09af\u09bc)',
    dashNext: '\u09aa\u09b0\u09ac\u09b0\u09cd\u09a4\u09c0 \u09ae\u09c7\u09af\u09bc\u09be\u09a6', dashNone: '\u0995\u09bf\u099b\u09c1 \u09b8\u09ae\u09af\u09bc\u09b8\u09c2\u099a\u09bf \u09a8\u09c7\u0987',
    addTask: '\u0995\u09be\u099c \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8', name: '\u0995\u09be\u099c\u09c7\u09b0 \u09a8\u09be\u09ae', category: '\u09ac\u09bf\u09ad\u09be\u0997', interval: '\u09aa\u09c1\u09a8\u09b0\u09be\u09ac\u09c3\u09a4\u09cd\u09a4\u09bf (\u09a6\u09bf\u09a8)',
    intervalHint: '\u09e6 = \u098f\u0995\u09ac\u09be\u09b0\u09c7\u09b0 \u0995\u09be\u099c (\u09a8\u09bf\u099a\u09c7 \u09ae\u09c7\u09af\u09bc\u09be\u09a6 \u09a6\u09bf\u09a8).', dueDate: '\u09ae\u09c7\u09af\u09bc\u09be\u09a6 \u09a4\u09be\u09b0\u09bf\u0996 (\u09b6\u09c1\u09a7\u09c1 \u098f\u0995\u09ac\u09be\u09b0\u09c7\u09b0 \u0995\u09be\u099c)',
    lastDone: '\u09b6\u09c7\u09b7 \u0995\u09b0\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7 (\u09ac\u09c8\u0995\u09b2\u09cd\u09aa\u09bf\u0995)', note: '\u09a8\u09cb\u099f (\u09ac\u09c8\u0995\u09b2\u09cd\u09aa\u09bf\u0995)', save: '\u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3 \u0995\u09b0\u09c1\u09a8', cancel: '\u09ac\u09be\u09a4\u09bf\u09b2',
    edit: '\u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09a8\u09be', del: '\u09ae\u09c1\u099b\u09c1\u09a8', done: '\u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8 \u099a\u09bf\u09a8\u09cd\u09b9\u09bf\u09a4', doneDate: '\u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8\u09c7\u09b0 \u09a4\u09be\u09b0\u09bf\u0996', doneCost: '\u0996\u09b0\u099a (\u099f\u09be\u0995\u09be)',
    confirmDone: '\u09a8\u09bf\u09b6\u09cd\u099a\u09bf\u09a4 \u0995\u09b0\u09c1\u09a8', deactivate: '\u09b8\u09cd\u09a5\u0997\u09bf\u09a4', activate: '\u099a\u09be\u09b2\u09c1 \u0995\u09b0\u09c1\u09a8',
    search: '\u0995\u09be\u099c \u0996\u09c1\u0981\u099c\u09c1\u09a8', filterStatus: '\u0985\u09ac\u09b8\u09cd\u09a5\u09be', filterCat: '\u09ac\u09bf\u09ad\u09be\u0997', all: '\u09b8\u09ac',
    emptyTasks: '\u098f\u0996\u09a8\u09cb \u0995\u09cb\u09a8\u09cb \u0995\u09be\u099c \u09a8\u09c7\u0987\u0964 \u0989\u09aa\u09b0\u09c7 \u09aa\u09cd\u09b0\u09a5\u09ae \u0995\u09be\u099c\u099f\u09bf \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8\u0964',
    emptyHist: '\u098f\u0996\u09a8\u09cb \u0995\u09cb\u09a8\u09cb \u09b8\u09c7\u09ac\u09be\u09b0 \u09b0\u09c7\u0995\u09b0\u09cd\u09a1 \u09a8\u09c7\u0987\u0964',
    histTitle: '\u09b8\u09c7\u09ac\u09be\u09b0 \u0987\u09a4\u09bf\u09b9\u09be\u09b8', histTask: '\u0995\u09be\u099c', histDate: '\u09a4\u09be\u09b0\u09bf\u0996', histCost: '\u0996\u09b0\u099a',
    totalSpentLabel: '\u09ae\u09cb\u099f \u0996\u09b0\u099a', perTask: '\u09aa\u09cd\u09b0\u09a4\u09bf \u0995\u09be\u099c\u09c7 \u0996\u09b0\u099a', perCat: '\u09aa\u09cd\u09b0\u09a4\u09bf \u09ac\u09bf\u09ad\u09be\u0997\u09c7 \u0996\u09b0\u099a',
    export: '\u099c\u09c7\u099c\u09b8\u0993\u09a8 \u098f\u0995\u09cd\u09b8\u09aa\u09cb\u09b0\u09cd\u099f', import: '\u099c\u09c7\u099c\u09b8\u0993\u09a8 \u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f', erase: '\u09b8\u09ac \u09a1\u09c7\u099f\u09be \u09ae\u09c1\u099b\u09c1\u09a8',
    eraseHint: '\u09b8\u09ac \u09ae\u09c1\u099b\u09a4\u09c7 DELETE \u09b2\u09bf\u0996\u09c1\u09a8\u0964', erased: '\u09b8\u09ac \u09a1\u09c7\u099f\u09be \u09ae\u09c1\u099b\u09be \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964',
    importOk: '\u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f \u09b8\u09ab\u09b2 \u09b9\u09af\u09bc\u09c7\u099b\u09c7\u0964', importBad: '\u0987\u09ae\u09aa\u09cb\u09b0\u09cd\u099f \u09ac\u09be\u09a4\u09bf\u09b2: \u0985\u09ac\u09c8\u09a7 \u09ab\u09be\u0987\u09b2\u0964',
    formError: '\u09a6\u09df\u09be \u0995\u09b0\u09c7 \u0995\u09cd\u09b7\u09c7\u09a4\u09cd\u09b0\u0997\u09c1\u09b2\u09bf \u09a0\u09bf\u0995 \u0995\u09b0\u09c1\u09a8\u0964',
    langBtn: 'English',
    status: { overdue: '\u09ae\u09c7\u09af\u09bc\u09be\u09a6\u09a6\u09c1\u09a4\u09cd\u09a4\u09c0\u09b0\u09cd\u09a3', 'due-today': '\u0986\u099c\u0995\u09c7 \u09ae\u09c7\u09af\u09bc\u09be\u09a6', 'due-soon': '\u09b6\u09c0\u0998\u09cd\u09b0\u0987 \u09ae\u09c7\u09af\u09bc\u09be\u09a6', ok: '\u09a0\u09bf\u0995 \u0986\u099b\u09c7', 'not-started': '\u09b6\u09c1\u09b0\u09c1 \u09b9\u09af\u09bc\u09a8\u09bf', done: '\u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8' },
    cat: { appliance: '\u09af\u09a8\u09cd\u09a4\u09cd\u09b0\u09aa\u09be\u09a4\u09bf', plumbing: '\u09aa\u09cd\u09b2\u09be\u09ae\u09cd\u09ac\u09bf\u0982', electrical: '\u09ac\u09c8\u09a6\u09cd\u09af\u09c1\u09a4\u09bf\u0995', cleaning: '\u09aa\u09b0\u09bf\u09b7\u09cd\u0995\u09be\u09b0', safety: '\u09a8\u09bf\u09b0\u09be\u09aa\u09a4\u09cd\u09a4\u09be', other: '\u0985\u09a8\u09cd\u09af\u09be\u09a8\u09cd\u09af' },
    dueLabel: '\u09ae\u09c7\u09af\u09bc\u09be\u09a6', lastLabel: '\u09b6\u09c7\u09b7', never: '\u0995\u0996\u09a8\u09cb \u09a8\u09be', daysOverdue: '\u09a6\u09bf\u09a8 \u0985\u09a4\u09bf\u0995\u09cd\u09b0\u09be\u09a8\u09cd\u09a4', inDays: '\u09a6\u09bf\u09a8 \u09aa\u09b0\u09c7',
    footer: '\u0985\u09ab\u09b2\u09be\u0987\u09a8 \u09ac\u09cd\u09af\u0995\u09cd\u09a4\u09bf\u0997\u09a4 \u099f\u09cd\u09b0\u09cd\u09af\u09be\u0995\u09be\u09b0\u0964 \u09a4\u09be\u09b0\u09bf\u0996 \u0993 \u0996\u09b0\u099a \u0986\u09aa\u09a8\u09be\u09b0 \u09a8\u09bf\u099c\u09c7\u09b0 \u09b0\u09c7\u0995\u09b0\u09cd\u09a1\u0964',
  },
};

function getParam(name) {
  try { return new URLSearchParams(location.search).get(name); } catch (e) { return null; }
}

let state = { tasks: [], logs: [], lang: 'en' };
let editingId = null;
let doneId = null;
let today = L.todayISO(getParam('asof'));

function uid() {
  return 't' + Date.now().toString(36) + Math.floor(Math.random() * 1e6).toString(36);
}

function load() {
  try {
    const raw = localStorage.getItem(L.STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      const v = L.validateImport(parsed);
      if (v.ok) { state = { tasks: parsed.tasks, logs: parsed.logs, lang: parsed.lang }; return; }
    }
  } catch (e) { /* corrupted storage -> fresh state */ }
  state = { tasks: [], logs: [], lang: 'en' };
}

function save() {
  localStorage.setItem(L.STORAGE_KEY, JSON.stringify({ app: L.APP_ID, version: L.VERSION, tasks: state.tasks, logs: state.logs, lang: state.lang }));
}

function T() { return STR[state.lang]; }
function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function fmtDate(iso) {
  if (!iso) return T().never;
  const s = iso;
  return state.lang === 'bn' ? L.toBnDigits(s) : s;
}
function toPaisa(bdtStr) {
  const n = Number(String(bdtStr).trim());
  if (!Number.isFinite(n) || n < 0) return null;
  return Math.round(n * 100);
}

function renderLang() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (T()[key] !== undefined) el.textContent = T()[key];
  });
  document.querySelectorAll('[data-tab]').forEach((el, i) => { el.textContent = T().tabs[i]; });
  document.getElementById('langBtn').textContent = T().langBtn;
  document.querySelectorAll('[data-i18n-ph]').forEach((el) => {
    el.placeholder = T()[el.getAttribute('data-i18n-ph')] || '';
  });
  // category options
  const sel = document.getElementById('fCategory');
  Array.from(sel.options).forEach((o) => { o.textContent = T().cat[o.value] || o.value; });
  const fCat = document.getElementById('filterCat');
  Array.from(fCat.options).forEach((o) => { o.textContent = o.value === 'all' ? T().all : (T().cat[o.value] || o.value); });
  const fSt = document.getElementById('filterStatus');
  Array.from(fSt.options).forEach((o) => { o.textContent = o.value === 'all' ? T().all : (T().status[o.value] || o.value); });
}

function dueText(task) {
  const due = L.nextDue(task);
  if (!due) return T().never;
  const diff = L.daysBetween(today, due);
  const base = fmtDate(due);
  if (diff < 0) return base + ' (' + L.fmtNum(-diff, state.lang) + ' ' + T().daysOverdue + ')';
  if (diff === 0) return base;
  return base + ' (' + T().inDays + ' ' + L.fmtNum(diff, state.lang) + ')';
}

function renderDashboard() {
  const s = L.summarize(state.tasks, state.logs, today);
  const set = (id, v) => { document.getElementById(id).textContent = v; };
  set('dTotal', L.fmtNum(s.total, state.lang));
  set('dActive', L.fmtNum(s.active, state.lang));
  set('dOverdue', L.fmtNum(s.overdue, state.lang));
  set('dToday', L.fmtNum(s.dueToday, state.lang));
  set('dSoon', L.fmtNum(s.dueSoon, state.lang));
  set('dSpent12', L.fmtMoney(s.spent12mo, state.lang));
  set('dSpentAll', L.fmtMoney(s.totalSpent, state.lang));
  set('dNext', s.nextDueTask ? s.nextDueTask.name + ' \u2014 ' + fmtDate(L.nextDue(s.nextDueTask)) : T().dashNone);
  // per-category spend list
  const ul = document.getElementById('catSpend');
  ul.innerHTML = L.CATEGORIES.map((c) =>
    '<li>' + esc(T().cat[c]) + ': <strong>' + esc(L.fmtMoney(s.byCategory[c] || 0, state.lang)) + '</strong></li>').join('');
}

function filteredTasks() {
  const q = (document.getElementById('searchInput').value || '').trim().toLowerCase();
  const st = document.getElementById('filterStatus').value;
  const cat = document.getElementById('filterCat').value;
  return state.tasks.filter((t) => {
    if (q && (t.name + ' ' + (t.note || '')).toLowerCase().indexOf(q) === -1) return false;
    if (st !== 'all' && L.statusOf(t, today) !== st) return false;
    if (cat !== 'all' && t.category !== cat) return false;
    return true;
  }).sort((a, b) => {
    const da = L.nextDue(a) || '9999', db = L.nextDue(b) || '9999';
    return da < db ? -1 : da > db ? 1 : a.name.localeCompare(b.name);
  });
}

function renderTasks() {
  const list = document.getElementById('taskList');
  const rows = filteredTasks();
  document.getElementById('noTasks').hidden = rows.length > 0;
  list.innerHTML = rows.map((t) => {
    const st = L.statusOf(t, today);
    const doneForm = doneId === t.id
      ? '<div class="done-form"><label>' + esc(T().doneDate) + ' <input type="date" id="doneDate" value="' + esc(today) + '"></label> ' +
        '<label>' + esc(T().doneCost) + ' <input type="number" id="doneCost" min="0" step="0.01" value="0"></label> ' +
        '<button type="button" data-act="confirm-done" data-id="' + esc(t.id) + '">' + esc(T().confirmDone) + '</button> ' +
        '<button type="button" data-act="cancel-done">' + esc(T().cancel) + '</button><span class="err" id="doneError"></span></div>'
      : '';
    return '<li class="task st-' + st + '" data-id="' + esc(t.id) + '">' +
      '<div class="task-top"><strong>' + esc(t.name) + '</strong> ' +
      '<span class="badge">' + esc(T().status[st]) + '</span> ' +
      '<span class="cat">' + esc(T().cat[t.category]) + '</span>' +
      (t.active ? '' : ' <span class="badge paused">PAUSED</span>') + '</div>' +
      '<div class="task-meta">' + esc(T().dueLabel) + ': ' + esc(dueText(t)) + ' &middot; ' + esc(T().lastLabel) + ': ' + esc(fmtDate(t.lastDone)) +
      (t.intervalDays > 0 ? ' &middot; ' + L.fmtNum(t.intervalDays, state.lang) + 'd' : '') + '</div>' +
      (t.note ? '<div class="note">' + esc(t.note) + '</div>' : '') +
      '<div class="row-actions">' +
      (t.active && st !== 'done' ? '<button type="button" data-act="done" data-id="' + esc(t.id) + '">' + esc(T().done) + '</button> ' : '') +
      '<button type="button" data-act="edit" data-id="' + esc(t.id) + '">' + esc(T().edit) + '</button> ' +
      '<button type="button" data-act="toggle" data-id="' + esc(t.id) + '">' + esc(t.active ? T().deactivate : T().activate) + '</button> ' +
      '<button type="button" data-act="delete" data-id="' + esc(t.id) + '">' + esc(T().del) + '</button></div>' +
      doneForm + '</li>';
  }).join('');
}

function renderHistory() {
  const sel = document.getElementById('histTask');
  const cur = sel.value;
  sel.innerHTML = '<option value="all">' + esc(T().all) + '</option>' +
    state.tasks.map((t) => '<option value="' + esc(t.id) + '">' + esc(t.name) + '</option>').join('');
  if (state.tasks.some((t) => t.id === cur)) sel.value = cur;
  const rows = state.logs.slice().sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id))
    .filter((l) => sel.value === 'all' || l.taskId === sel.value);
  document.getElementById('noHist').hidden = rows.length > 0;
  const total = rows.reduce((s, l) => s + l.costPaisa, 0);
  document.getElementById('histTotal').textContent = T().totalSpentLabel + ': ' + L.fmtMoney(total, state.lang);
  document.getElementById('histList').innerHTML = rows.map((l) => {
    const t = state.tasks.find((x) => x.id === l.taskId);
    return '<li>' + esc(t ? t.name : '?') + ' &mdash; ' + esc(fmtDate(l.date)) + ' &mdash; ' + esc(L.fmtMoney(l.costPaisa, state.lang)) + '</li>';
  }).join('');
}

function renderAll() {
  renderLang();
  renderDashboard();
  renderTasks();
  renderHistory();
}

function fillForm(t) {
  document.getElementById('fName').value = t ? t.name : '';
  document.getElementById('fCategory').value = t ? t.category : 'appliance';
  document.getElementById('fInterval').value = t ? String(t.intervalDays) : '90';
  document.getElementById('fDue').value = t ? (t.dueDate || '') : '';
  document.getElementById('fLast').value = t ? (t.lastDone || '') : '';
  document.getElementById('fNote').value = t ? (t.note || '') : '';
  document.getElementById('formError').textContent = '';
}

document.addEventListener('DOMContentLoaded', () => {
  load();
  // language: stored lang wins; default en
  today = L.todayISO(getParam('asof'));

  document.getElementById('langBtn').addEventListener('click', () => {
    state.lang = state.lang === 'en' ? 'bn' : 'en';
    save(); renderAll();
  });

  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.tab').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('tab-' + btn.getAttribute('data-tab')).classList.add('active');
    });
  });

  ['searchInput', 'filterStatus', 'filterCat'].forEach((id) => {
    document.getElementById(id).addEventListener('input', renderTasks);
    document.getElementById(id).addEventListener('change', renderTasks);
  });
  document.getElementById('histTask').addEventListener('change', renderHistory);

  document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const intervalDays = Number(document.getElementById('fInterval').value);
    const dueRaw = document.getElementById('fDue').value;
    const lastRaw = document.getElementById('fLast').value;
    const candidate = {
      id: editingId || uid(),
      name: document.getElementById('fName').value.trim(),
      category: document.getElementById('fCategory').value,
      intervalDays: Number.isInteger(intervalDays) ? intervalDays : NaN,
      dueDate: intervalDays === 0 ? (dueRaw || null) : null,
      lastDone: lastRaw || null,
      note: document.getElementById('fNote').value.trim(),
      completed: false,
      active: true,
    };
    if (editingId) {
      const orig = state.tasks.find((t) => t.id === editingId);
      if (orig) { candidate.completed = orig.completed; candidate.active = orig.active; }
    }
    const v = L.validateTask(candidate, today);
    if (!v.ok) {
      document.getElementById('formError').textContent = T().formError + ' (' + v.errors.join(', ') + ')';
      return;
    }
    if (editingId) {
      state.tasks = state.tasks.map((t) => (t.id === editingId ? candidate : t));
      editingId = null;
    } else {
      state.tasks.push(candidate);
    }
    save(); fillForm(null); renderAll();
  });
  document.getElementById('cancelEdit').addEventListener('click', () => { editingId = null; fillForm(null); });

  document.getElementById('taskList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const act = btn.getAttribute('data-act');
    if (act === 'delete') {
      state.tasks = state.tasks.filter((t) => t.id !== id);
      state.logs = state.logs.filter((l) => l.taskId !== id);
      save(); renderAll();
    } else if (act === 'edit') {
      const t = state.tasks.find((x) => x.id === id);
      if (t) { editingId = id; fillForm(t); document.getElementById('fName').focus(); }
    } else if (act === 'toggle') {
      const t = state.tasks.find((x) => x.id === id);
      if (t) { t.active = !t.active; save(); renderAll(); }
    } else if (act === 'done') {
      doneId = id; renderTasks();
    } else if (act === 'cancel-done') {
      doneId = null; renderTasks();
    } else if (act === 'confirm-done') {
      const t = state.tasks.find((x) => x.id === id);
      const date = document.getElementById('doneDate').value;
      const paisa = toPaisa(document.getElementById('doneCost').value);
      const errEl = document.getElementById('doneError');
      if (!t || !L.isValidDate(date) || date > today || paisa === null) {
        if (errEl) errEl.textContent = T().formError;
        return;
      }
      const res = L.markDone(t, date, paisa, uid());
      state.tasks = state.tasks.map((x) => (x.id === id ? res.task : x));
      state.logs.push(res.log);
      doneId = null;
      save(); renderAll();
    }
  });

  document.getElementById('exportBtn').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify({ app: L.APP_ID, version: L.VERSION, tasks: state.tasks, logs: state.logs, lang: state.lang }, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'home-maintenance-bd.json';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  document.getElementById('importFile').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        const v = L.validateImport(parsed);
        const msg = document.getElementById('dataMsg');
        if (!v.ok) { msg.textContent = T().importBad; return; }
        state = { tasks: parsed.tasks, logs: parsed.logs, lang: parsed.lang };
        save(); renderAll();
        msg.textContent = T().importOk;
      } catch (err) {
        document.getElementById('dataMsg').textContent = T().importBad;
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  });

  document.getElementById('eraseBtn').addEventListener('click', () => {
    if (document.getElementById('eraseInput').value.trim() !== 'DELETE') return;
    state = { tasks: [], logs: [], lang: state.lang };
    editingId = null; doneId = null;
    save(); fillForm(null); renderAll();
    document.getElementById('dataMsg').textContent = T().erased;
    document.getElementById('eraseInput').value = '';
  });

  fillForm(null);
  renderAll();
});
