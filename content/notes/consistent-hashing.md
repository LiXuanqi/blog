---
title: Consistent Hashing
date: 2025-08-26
description: ""
tags: ["System design"]
visible: true
---

## What is consistent hashing?

Consistent hashing is a distributed hashing technique that minimizes the number of keys that need to be redistributed when nodes are added or removed from a system

## How it Works?

How Consistent Hashing Works
Instead of hashing keys directly to servers, consistent hashing maps both keys and servers to points on a circular hash ring (imagine a circle with values 0 to 2^32-1). To find which server handles a key:

1. Hash the key to get its position on the ring
2. Move clockwise from that position until you find the first server
3. That server is responsible for the key

When a server is added or removed, only the keys between that server and the previous server on the ring need to be redistributed

## Virtual Nodes (Vnodes)

each physical server is mapped to multiple points on the ring. This provides better load distribution and reduces the impact when servers join or leave. Instead of one point per server, you might have 100-500 virtual nodes per physical server.

## Benefit of handling server failures gracefully

Even after a failure, you can still determine exactly which server should have a piece of data. This makes it possible to implement strategies like:

- Read repair: If data isn't found on the expected server, check the previous server (where it might have been before the failure)
- Hinted handoff: Temporarily store data intended for the failed server on the next server, then transfer it back when the original server recovers

## With Replication

Consistent hashing works even better with replication. If each key is stored on 3 consecutive servers (N=3 replication), then when one server fails, you still have 2 copies available on the next servers in the ring. The system can continue serving reads and writes without any downtime.
