---
title: One root cause behind five incidents
role: Senior Software Engineer
tags: [Incident analysis, Debugging]
---
## The problem

Over several weeks, five separate tickets came in: customers in one market receiving another market's messages, some events never reaching their campaigns, and analytics that didn't reconcile. Each had been triaged on its own, and each looked like a different bug.

## What I found

Following one event end to end showed a processing step that never read the customer's region. The stored record carried an empty region, and a hard-coded fallback quietly sent every event to the default market. One missing lookup explained all five symptoms.

## What I changed

The step now fetches the region explicitly, the field is required, and a missing value fails loudly instead of defaulting. Affected records were backfilled and the fix shipped to production.

> An optional field with a default is a routing decision in disguise.
