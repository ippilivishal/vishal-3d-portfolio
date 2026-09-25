---
title: Eliminating silent message loss
role: Senior Software Engineer
tags: [Reliability, Event delivery]
---
## The problem

A customer-notification pipeline on a trading platform was losing messages without raising a single error. During traffic bursts the downstream messaging provider rate-limited our requests. Failed sends were not retried and nothing alerted, so the first signal was customers asking where their confirmation went.

<figure class="wk-diagram">
<svg viewBox="0 0 760 300" role="img" aria-label="Event flows to the notifier, which adds an idempotency key and sends to the provider. Rate-limited sends retry with backoff; anything still failing goes to a dead-letter queue with a replay path back to the notifier." xmlns="http://www.w3.org/2000/svg" font-family="Helvetica Neue, Arial, sans-serif">
<style>
.b{fill:rgba(244,241,234,.06);stroke:rgba(244,241,234,.55);stroke-width:1.4}
.t{fill:#f4f1ea;font-size:15px;font-weight:600}
.s{fill:rgba(244,241,234,.6);font-size:12px}
.l{fill:none;stroke:rgba(244,241,234,.45);stroke-width:1.4}
.w{fill:none;stroke:#ffb466;stroke-width:1.4;stroke-dasharray:5 5}
.r{fill:none;stroke:#8ce6a0;stroke-width:1.4;stroke-dasharray:5 5}
</style>
<defs><marker id="a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="rgba(244,241,234,.7)"/></marker></defs>
<rect class="b" x="20" y="60" width="130" height="64" rx="10"/><text class="t" x="85" y="90" text-anchor="middle">Event</text><text class="s" x="85" y="110" text-anchor="middle">order filled</text>
<rect class="b" x="230" y="60" width="170" height="64" rx="10"/><text class="t" x="315" y="88" text-anchor="middle">Notifier</text><text class="s" x="315" y="108" text-anchor="middle">+ idempotency key</text>
<rect class="b" x="490" y="60" width="150" height="64" rx="10"/><text class="t" x="565" y="88" text-anchor="middle">Provider</text><text class="s" x="565" y="108" text-anchor="middle">rate-limited (429)</text>
<rect class="b" x="490" y="200" width="150" height="64" rx="10"/><text class="t" x="565" y="228" text-anchor="middle">Dead-letter queue</text><text class="s" x="565" y="248" text-anchor="middle">+ depth alarm</text>
<text class="t" x="700" y="98" style="fill:#8ce6a0">✓</text><text class="s" x="684" y="118">delivered</text>
<path id="p1" class="l" d="M150 92H228" marker-end="url(#a)"/>
<path id="p2" class="l" d="M400 92H488" marker-end="url(#a)"/>
<path class="w" d="M540 60C540 20 390 20 360 58" marker-end="url(#a)"/><text class="s" x="400" y="26" style="fill:#ffb466">retry · backoff + jitter</text>
<path class="l" d="M565 124V198" marker-end="url(#a)"/><text class="s" x="575" y="166">still failing</text>
<path class="r" d="M490 232H330V126" marker-end="url(#a)"/><text class="s" x="345" y="252" style="fill:#8ce6a0">replay</text>
<circle r="5" fill="#ffd9b3"><animateMotion dur="2.4s" repeatCount="indefinite" path="M150 92H488"/></circle>
<circle r="5" fill="#ffd9b3"><animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M150 92H488"/></circle>
<circle r="4" fill="#ffb466"><animateMotion dur="3s" repeatCount="indefinite" path="M540 60C540 20 390 20 360 58"/></circle>
</svg>
<figcaption>Idempotency first, then retries, then a dead-letter queue with a way back.</figcaption>
</figure>

## What I changed

- **Idempotency first.** Every send got an idempotency key, so the same message could never be delivered twice.
- **Then retries.** Exponential backoff with jitter, kept under the provider's limit.
- **A safety net.** Anything that still failed landed in a dead-letter queue with a replay path and an alarm on its depth.
- **Careful rollout.** Region by region behind a flag, so each market was verified before the next switched over.

## What I'd tell another team

> Idempotency before retry. Retrying a non-idempotent call turns a delivery problem into a duplication problem — and customers notice duplicates faster than delays.
