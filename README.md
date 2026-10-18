# Home Maintenance BD

Offline bilingual (English / Bangla) household maintenance tracker for Bangladesh.
Keep service schedules, due dates, and repair costs for everything in the home -
AC servicing, water-filter changes, gas-cylinder refills, plumbing fixes, safety
checks - in one place, with no account and no network calls.

## Features

- **Task manager** - add recurring tasks (repeat every N days) or one-time tasks
  with a due date; 6 categories (Appliance, Plumbing, Electrical, Cleaning,
  Safety, Other); optional last-done date and note; edit, pause/resume, delete.
- **Due engine** - next-due = last-done + interval; statuses Overdue / Due today /
  Due soon (within 7 days) / On track / Not started / Done; overdue age in days.
- **Mark done** - log a service with date + cost (BDT); recurring tasks roll their
  next due date forward; one-time tasks become Done.
- **Dashboard** - total/active/overdue/due-today/due-soon counts, next-due task,
  spend in the last 12 months and all time, spend per category.
- **Service history** - per-task filter, total spent for the filtered view.
- **Data portability** - JSON export / strict import (wrong app, version, duplicate
  ids, orphan log entries, negative costs all rejected with data intact),
  typed-`DELETE` erase-all.
- **Bilingual** - EN / Bangla toggle persisted in localStorage; Bengali digits in
  Bangla mode; Bangla-safe search.
- **Offline & private** - pure static site; data lives in your browser's
  localStorage; zero network requests by design.

## Stack

Vanilla HTML + CSS + JavaScript. No frameworks, no build step, no dependencies.

## Run locally

Open `index.html` in any modern browser, or serve the folder:

```sh
python3 -m http.server 8080
# open http://localhost:8080/
```

For deterministic dates in tests, the app accepts `?asof=YYYY-MM-DD`
(test-only override).

## Testing

```sh
node tests/unit.test.js        # 54 pure-logic checks
node tests/smoke.js desktop    # 25 headless-Chrome checks
node tests/smoke.js mobile     # 26 headless-Chrome checks (390px)
```

Smoke tests use the system Chromium at `/opt/meta-chromium/chrome` via raw CDP;
no npm packages required.

## Deployment

Static hosting (e.g. GitHub Pages): publish the repo root. No server, no env vars.

## Limitations

- Data is stored in one browser's localStorage - no sync across devices.
- Dates and costs are your own records; the app gives no contractor, warranty,
  or safety advice. For gas/electrical work, follow a qualified technician's
  guidance.
- No reminders/notifications: the app shows what is due when you open it.

## Status

MVP complete. Ships with no sample data (starts empty).
