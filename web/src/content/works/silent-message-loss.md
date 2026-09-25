---
title: Eliminating silent message loss
role: Senior Software Engineer
tags: [Reliability, Event delivery]
---
## The problem

A customer-notification pipeline on a trading platform was losing messages without raising a single error. During traffic bursts the downstream messaging provider rate-limited our requests. Failed sends were not retried and nothing alerted, so the first signal was customers asking where their confirmation went.

## What I changed

- **Idempotency first.** Every send got an idempotency key, so the same message could never be delivered twice.
- **Then retries.** Exponential backoff with jitter, kept under the provider's limit.
- **A safety net.** Anything that still failed landed in a dead-letter queue with a replay path and an alarm on its depth.
- **Careful rollout.** Region by region behind a flag, so each market was verified before the next switched over.

## What I'd tell another team

> Idempotency before retry. Retrying a non-idempotent call turns a delivery problem into a duplication problem — and customers notice duplicates faster than delays.
