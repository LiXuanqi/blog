---
title: Lessons from the Best Code Reviewers I've Known
date: 2025-12-21
description: "Five lessons from great code reviewers on coaching through comments, giving actionable feedback, using nit picks well, escalating long threads, and evaluating approach before details."
image: "/blog-covers/lessons-from-the-best-code-reviewers-cover-v2.png"
tags: []
visible: true
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

## Lesson 3: Approve with nit Comments

Not every comment needs to block a PR.

If your feedback is minor—more of a suggestion than a strong opinion—make that explicit. Prefix it with nit: so the author knows it’s optional:

nit: rename to `amount_in_cents`

Then go ahead and approve the PR.

This keeps the review process moving while still sharing improvements. More importantly, it shows trust—your peers can decide whether to incorporate small suggestions without being blocked.

## Lesson 4: Switch to Real-Time When Threads Get Long

If a comment thread goes beyond 2–3 rounds, it’s usually a signal: something isn’t aligning.

At that point, stop iterating in comments.

Send a quick message on Slack and talk it through—whether that’s a quick call or an in-person chat. A 5-minute conversation often replaces 30 minutes of back-and-forth.

Async works well—until it doesn’t.

## Lesson 5: Review the Approach Before the Details

Before diving into naming, logic, or syntax, step back and evaluate the approach.

Start by understanding the problem:

What is this PR trying to solve?
If you were implementing it, how would you approach it?

Then compare that mental model with the author’s solution.

This high-level alignment matters more than catching small issues—especially in today’s “vibe coding” era. As tools and models get better, most PRs already work. The real question is whether they represent the right approach for the system.

Focus your energy there first.
