---
title: Socket
date: 2025-08-26
description: ""
tags: ["System design"]
visible: true
---

## What is socket?

At its core, a socket is an abstraction that provides a programming interface for network communication. It's like a telephone - you can use it to establish a connection, send messages, receive messages, and hang up.

## Type of sockets

### TCP sockets

- Reliable, ordered delivery
- Connection-oriented (like a phone call)
- Error checking and retransmission
- Used for: HTTP, email, file transfer

### UDP sockets

Characteristics:

- Fast but unreliable
- Connectionless (like sending postcards)
- No delivery guarantees
- Used for: DNS queries, live streaming, gaming

Example: Video call data, online games

### Unix Domain Sockets (Local Sockets)

For communication within the same machine:

- Faster than network sockets (no network overhead)
- Used for: Database connections, Docker communication
- Example: Application ↔ Local database server
