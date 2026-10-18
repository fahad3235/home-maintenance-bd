/* home-maintenance-bd - pure logic (no DOM). Node + browser.
   Money is integer paisa. Dates are strict YYYY-MM-DD strings. */
'use strict';

const APP_ID = 'home-maintenance-bd';
const VERSION = 1;
const STORAGE_KEY = 'home-maintenance-bd:v1';
const CATEGORIES = ['appliance', 'plumbing', 'electrical', 'cleaning', 'safety', 'other'];
const BN_DIGITS = ['\u09e6', '\u09e7', '\u09e8', '\u09e9', '\u09ea', '\u09eb', '\u09ec', '\u09ed', '\u09ee', '\u09ef'];
const TAKA = '\u09f3';

function toBnDigits(s) {
  return String(s).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}

function isValidDate(s) {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const [y, m, d] = s.split('-').map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

function toISODate(dt) {
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const d = String(dt.getUTCDate()).padStart(2, '0');
  return y + '-' + m + '-' + d;
}

function parseDate(s) {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function addDays(iso, n) {
  const dt = parseDate(iso);
  dt.setUTCDate(dt.getUTCDate() + n);
  return toISODate(dt);
}

function daysBetween(a, b) {
  // b - a in whole days
  return Math.round((parseDate(b) - parseDate(a)) / 86400000);
}

function todayISO(asof) {
  if (asof && isValidDate(asof)) return asof;
  const now = new Date();
  return toISODate(new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())));
}

function fmtMoney(paisa, lang) {
  const n = paisa / 100;
  const s = n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return TAKA + (lang === 'bn' ? toBnDigits(s) : s);
}

function fmtNum(n, lang) {
  const s = String(n);
  return lang === 'bn' ? toBnDigits(s) : s;
}

/* Next due date for a task, or null when it has no scheduled due date. */
function nextDue(task) {
  if (task.completed) return null;
  if (task.intervalDays > 0) {
    return task.lastDone ? addDays(task.lastDone, task.intervalDays) : null;
  }
  return task.dueDate || null;
}

function statusOf(task, today) {
  if (task.completed) return 'done';
  const due = nextDue(task);
  if (!due) return 'not-started';
  const diff = daysBetween(today, due);
  if (diff < 0) return 'overdue';
  if (diff === 0) return 'due-today';
  if (diff <= 7) return 'due-soon';
  return 'ok';
}

function validateTask(t, today) {
  const errors = [];
  if (!t || typeof t !== 'object') return { ok: false, errors: ['invalid'] };
  if (typeof t.name !== 'string' || t.name.trim().length < 1 || t.name.trim().length > 80) errors.push('name');
  if (CATEGORIES.indexOf(t.category) === -1) errors.push('category');
  if (!Number.isInteger(t.intervalDays) || t.intervalDays < 0 || t.intervalDays > 3650) errors.push('interval');
  if (t.intervalDays === 0) {
    if (!isValidDate(t.dueDate)) errors.push('dueDate');
  } else if (t.dueDate !== null && t.dueDate !== undefined && t.dueDate !== '') {
    errors.push('dueDate');
  }
  if (t.lastDone !== null && t.lastDone !== undefined && t.lastDone !== '') {
    if (!isValidDate(t.lastDone)) errors.push('lastDone');
    else if (today && t.lastDone > today) errors.push('lastDoneFuture');
  }
  if (t.note !== undefined && (typeof t.note !== 'string' || t.note.length > 500)) errors.push('note');
  return { ok: errors.length === 0, errors };
}

function validateLog(entry) {
  if (!entry || typeof entry !== 'object') return false;
  if (typeof entry.id !== 'string' || !entry.id) return false;
  if (typeof entry.taskId !== 'string' || !entry.taskId) return false;
  if (!isValidDate(entry.date)) return false;
  if (!Number.isInteger(entry.costPaisa) || entry.costPaisa < 0 || entry.costPaisa > 1000000000) return false;
  return true;
}

function validateImport(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return { ok: false, errors: ['root'] };
  if (obj.app !== APP_ID) return { ok: false, errors: ['app'] };
  if (obj.version !== VERSION) return { ok: false, errors: ['version'] };
  if (!Array.isArray(obj.tasks) || !Array.isArray(obj.logs)) return { ok: false, errors: ['shape'] };
  if (obj.lang !== 'en' && obj.lang !== 'bn') return { ok: false, errors: ['lang'] };
  const ids = new Set();
  for (const t of obj.tasks) {
    if (typeof t.id !== 'string' || !t.id || ids.has(t.id)) return { ok: false, errors: ['taskId'] };
    ids.add(t.id);
    if (validateTask(t).ok === false) return { ok: false, errors: ['task'] };
    if (typeof t.completed !== 'boolean') return { ok: false, errors: ['completed'] };
    if (typeof t.active !== 'boolean') return { ok: false, errors: ['active'] };
  }
  const logIds = new Set();
  for (const l of obj.logs) {
    if (!validateLog(l)) return { ok: false, errors: ['log'] };
    if (logIds.has(l.id)) return { ok: false, errors: ['logId'] };
    logIds.add(l.id);
    if (!ids.has(l.taskId)) return { ok: false, errors: ['logTask'] };
  }
  return { ok: true, errors: [] };
}

/* Mark a task done on `date` at `costPaisa`. Returns {task, log}. */
function markDone(task, date, costPaisa, logId) {
  const t = Object.assign({}, task);
  const log = { id: logId, taskId: task.id, date, costPaisa };
  if (t.intervalDays === 0) {
    t.completed = true;
  } else {
    t.lastDone = date;
  }
  return { task: t, log };
}

function summarize(tasks, logs, today) {
  const active = tasks.filter((t) => t.active);
  let overdue = 0, dueToday = 0, dueSoon = 0;
  let next = null;
  for (const t of active) {
    const st = statusOf(t, today);
    if (st === 'overdue') overdue++;
    if (st === 'due-today') dueToday++;
    if (st === 'due-soon') dueSoon++;
    const due = nextDue(t);
    if (due && (!next || due < nextDue(next))) next = t;
  }
  let totalSpent = 0, spent12mo = 0;
  const cutoff = addDays(today, -365);
  for (const l of logs) {
    totalSpent += l.costPaisa;
    if (l.date >= cutoff) spent12mo += l.costPaisa;
  }
  const byCategory = {};
  for (const c of CATEGORIES) byCategory[c] = 0;
  for (const l of logs) {
    const t = tasks.find((x) => x.id === l.taskId);
    if (t) byCategory[t.category] += l.costPaisa;
  }
  return {
    total: tasks.length, active: active.length, overdue, dueToday, dueSoon,
    nextDueTask: next, totalSpent, spent12mo, byCategory,
  };
}

const api = {
  APP_ID, VERSION, STORAGE_KEY, CATEGORIES,
  toBnDigits, isValidDate, toISODate, parseDate, addDays, daysBetween, todayISO,
  fmtMoney, fmtNum, nextDue, statusOf, validateTask, validateLog, validateImport,
  markDone, summarize,
};

if (typeof module !== 'undefined' && module.exports) module.exports = api;
if (typeof window !== 'undefined') window.HMLogic = api;
