---
title: Voice-based grievance routing
role: Final-year project, SRM University
tags: [Academic project, NLP]
---
## The idea

People with a complaint should be able to speak it rather than fill in a form. The system took a voice recording, converted it to text, used opinion mining to judge sentiment and urgency, and then used a fuzzy-logic classifier to route the grievance to the department most likely to own it.

## What worked

Designing around messy input: accents, background noise, and complaints that mention three departments at once. Fuzzy membership handled the "partly this, partly that" cases better than hard rules did.

## Looking back

A modern transformer model would beat the whole pipeline today with far less hand-tuning. The part that still holds is the framing: the value was never in the classifier, it was in removing the form.
