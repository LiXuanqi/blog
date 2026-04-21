---
title: Lessons from the Best Code Reviewers I've Known
date: 2025-12-21
description: ""
tags: []
visible: false
---

I’ve been lucky to work with some truly great code reviewers. Looking back, many of their comments stuck with me—not because they were strict, but because they taught me how to think. This post is a collection of those moments, written as reminders to myself.

## Lesson 1: Code review is an opportunity for coaching

During my internship at Yelp in 2019, my mentor didn’t just point out issues—he asked questions about design decisions and trade-offs.

One comment I still remember: “Have you considered using tempfile?”

At first glance, it’s a small suggestion. But it nudged me to explore not just the tempfile module, but also broader Python concepts like context managers.

More importantly, it taught me to think beyond “does this work?” and toward “is this the right approach?”

## Lesson 2: Give actionable feedback

Avoid vague comments like:

“This variable name is not good.”

“Not good” doesn’t explain why. It gives the author nothing to act on. Most engineers are already trying to write their best code—so feedback like this is frustrating and often leads to unnecessary back-and-forth before the change can be merged.

Do this instead:

Suggest concrete alternatives.
If a variable name is unclear, propose a better one and explain your reasoning.
Explain the underlying issue.
Even if you’re not a domain expert and can’t suggest a perfect fix, you can still point out what feels off. For example:
“This design is tightly coupled with component X, which could make it harder to extend or support new features in the future.”

Actionable feedback reduces iteration cycles and helps others improve—not just their code, but how they think about writing it.
