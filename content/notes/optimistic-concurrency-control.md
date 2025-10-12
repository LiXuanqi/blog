---
title: Optimistic Concurrency Control
date: 2025-08-26
description: ""
tags: ["System design"]
visible: true
---

## What is Optimistic Concurrency Control?

Avoid locking by assume that we can do the work without locking and check to see if we were right.

Example: compareAndSwap(CAS)

Optimistic concurrency control makes the assumption that most of the time we won't have contention
