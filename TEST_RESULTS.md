# TEST RESULTS - home-maintenance-bd (run #84, 11:00 slot, 2026-10-18)

## Unit tests - 54/54 passed
`node tests/unit.test.js` (asof 2026-10-18). Hand-verified cases:
- Dates: 2026-02-29 rejected (non-leap), 2028-02-29 accepted; addDays
  2026-10-18 +90 = 2027-01-16; month boundary 2026-01-31 +1 = 2026-02-01.
- Due engine: AC lastDone 2026-08-01 + 90d = due 2026-10-30 (12d out -> ok);
  lastDone 2026-07-25 -> due 2026-10-23 -> due-soon; 2026-07-20 -> due-today;
  2026-07-01 -> overdue; never-done -> not-started + nextDue null.
- One-time: nextDue = dueDate; completed -> status done + nextDue null.
- markDone: recurring lastDone updated and next due rolls to 2027-01-16;
  one-time completes; log carries taskId/date/costPaisa.
- Money: fmtMoney(150000, en) = BDT 1,500.00; BN digits render Bengali numerals.
- Validation: empty name, bad category, negative interval, one-time without
  dueDate, recurring carrying dueDate, future lastDone, 501-char note - all rejected.
- Import: wrong app/version/lang, duplicate task id, orphan log, negative cost,
  task missing `completed` - all rejected.
- Summarize scenario (AC overdue + one-time due-soon + fresh not-started;
  logs 150,000 + 50,000 paisa, second dated 2025-01-01): total 3, overdue 1,
  dueSoon 1, dueToday 0, next-due = AC, totalSpent 200,000, spent12mo 150,000
  (2025 log excluded), byCategory appliance 150,000 / plumbing 50,000;
  paused task excluded from overdue/active counts.

## Smoke tests - desktop 25/25, mobile 26/26, 0 console/page errors
`node tests/smoke.js desktop|mobile` (raw CDP, /opt/meta-chromium/chrome,
file:// + ?asof=2026-10-18). Covered: title + empty state; invalid task and
one-time-without-due-date rejected inline with no row added; add AC (overdue)
+ Fix leak (due 2026-10-20, due-soon); dashboard overdue 1 / due-soon 1 /
due-today 0 / next-due AC 2026-09-29; mark-done with BDT 1,500 -> history 1 row,
overdue 0, spent 1,500.00; BN toggle (Bengali title + digits); reload
persistence (2 tasks); erase -> 0 tasks; export-state round-trip restores 2;
malformed import rejected with data intact; mobile 390px no horizontal overflow;
zero network requests (file:// only).

## Repairs
0 app bugs. 1 pre-test hygiene fix (raw Bengali danda / em-dash bytes replaced
with \u0964 / ASCII escapes so all sources are pure ASCII); 1 pre-test fix
(dashboard next-due used esc() on a textContent assignment - removed).

## ASCII hygiene
`grep -rP '[^\x00-\x7F]'` over all shipped sources: zero matches. Bengali is
emitted as \uXXXX escapes only.
