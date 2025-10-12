---
title: Long polling
date: 2025-08-26
description: ""
tags: ["System design"]
visible: true
---

## What is long polling?

the client makes an HTTP request to the server, but instead of the server responding immediately, it holds the request open for an extended period (typically 30-60 seconds) until either:

- New data becomes available
- A timeout occurs
- An error happens

Once any of these conditions are met, the server responds, and the client immediately makes a new request, creating a continuous cycle.

## Pros and Cons

Pros:

- fewer requests compared to short polling
- feel like real-time without the complexity of WebSockets
- Uses standard HTTP

Cons:

- Keeps connections open for extended periods
- Scalability challenges: Can be problematic with thousands of concurrent long-held connections.
- Complexity to manage timeout
