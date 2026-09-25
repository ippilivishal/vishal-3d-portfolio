---
title: One root cause behind five incidents
role: Senior Software Engineer
tags: [Incident analysis, Debugging]
---
## The problem

Over several weeks, five separate tickets came in: customers in one market receiving another market's messages, some events never reaching their campaigns, and analytics that didn't reconcile. Each had been triaged on its own, and each looked like a different bug.

<figure class="wk-diagram">
<svg viewBox="0 0 760 300" role="img" aria-label="Five separate incidents all trace back to one processing step that never read the customer's region; a hard-coded default then routed every event to the default market." xmlns="http://www.w3.org/2000/svg" font-family="Helvetica Neue, Arial, sans-serif">
<style>
.b{fill:rgba(244,241,234,.06);stroke:rgba(244,241,234,.5);stroke-width:1.3}
.k{fill:rgba(255,180,102,.12);stroke:#ffb466;stroke-width:1.6}
.g{fill:rgba(140,230,160,.1);stroke:#8ce6a0;stroke-width:1.6}
.t{fill:#f4f1ea;font-size:13px}
.h{fill:#f4f1ea;font-size:15px;font-weight:600}
.s{fill:rgba(244,241,234,.62);font-size:12px}
.f{fill:none;stroke:rgba(255,180,102,.7);stroke-width:1.4;stroke-dasharray:6 6}
.f{animation:flow 1.2s linear infinite}
@keyframes flow{to{stroke-dashoffset:-24}}
@media (prefers-reduced-motion:reduce){.f{animation:none}}
</style>
<rect class="b" x="20" y="18" width="210" height="36" rx="8"/><text class="t" x="34" y="41">#1 Wrong market’s messages</text>
<rect class="b" x="20" y="70" width="210" height="36" rx="8"/><text class="t" x="34" y="93">#2 Events missing campaigns</text>
<rect class="b" x="20" y="122" width="210" height="36" rx="8"/><text class="t" x="34" y="145">#3 Analytics don’t reconcile</text>
<rect class="b" x="20" y="174" width="210" height="36" rx="8"/><text class="t" x="34" y="197">#4 Wrong market, again</text>
<rect class="b" x="20" y="226" width="210" height="36" rx="8"/><text class="t" x="34" y="249">#5 Missing campaign, again</text>
<path class="f" d="M230 36C300 36 300 140 350 140"/><path class="f" d="M230 88C300 88 300 140 350 140"/><path class="f" d="M230 140H350"/><path class="f" d="M230 192C300 192 300 140 350 140"/><path class="f" d="M230 244C300 244 300 140 350 140"/>
<rect class="k" x="350" y="98" width="190" height="84" rx="12"/><text class="h" x="445" y="128" text-anchor="middle">One step never</text><text class="h" x="445" y="148" text-anchor="middle">read the region</text><text class="s" x="445" y="168" text-anchor="middle">empty → silent default</text>
<path d="M540 140H590" stroke="#8ce6a0" stroke-width="1.6" fill="none"/><path d="M584 134L592 140L584 146" stroke="#8ce6a0" stroke-width="1.6" fill="none"/>
<rect class="g" x="594" y="98" width="150" height="84" rx="12"/><text class="h" x="669" y="128" text-anchor="middle">Required field</text><text class="s" x="669" y="148" text-anchor="middle">fails loudly</text><text class="s" x="669" y="166" text-anchor="middle">+ backfill</text>
</svg>
<figcaption>Five symptoms, one missing lookup.</figcaption>
</figure>

## What I found

Following one event end to end showed a processing step that never read the customer's region. The stored record carried an empty region, and a hard-coded fallback quietly sent every event to the default market. One missing lookup explained all five symptoms.

## What I changed

The step now fetches the region explicitly, the field is required, and a missing value fails loudly instead of defaulting. Affected records were backfilled and the fix shipped to production.

> An optional field with a default is a routing decision in disguise.
