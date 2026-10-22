---
# SAMPLE POST — placeholder content. Replace or delete.
title: Postgres advisory locks are underrated
date: 2026-06-18
summary: A tiny, built-in way to make sure only one worker runs a job at a time — no Redis required.
tags: [engineering]
draft: false
---

_Sample note — placeholder content to demonstrate the layout. Replace or delete this file._

Needed to stop two cron workers from running the same nightly job. Reached for Redis out of habit, then remembered Postgres already has this.

```sql
-- Returns true if we got the lock, false if someone else holds it.
SELECT pg_try_advisory_lock(hashtext('nightly-report'));

-- ...do the work...

SELECT pg_advisory_unlock(hashtext('nightly-report'));
```

The lock is tied to the session, so if the worker crashes the lock is released automatically. One fewer moving part in the stack.

Caveat: with a connection pooler in transaction mode, use `pg_try_advisory_xact_lock` instead so the lock lives inside a single transaction.
