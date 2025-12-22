---
title: Kafka
date: 2025-11-02
description: ""
tags: ["System design"]
visible: true
---

When distrubute our queue, how do we ensure that the events are still processed in order?

This is one of the fundamental ideas behind Kafka: messages sent and received through Kafka require a user specified distribution strategy.

how do we make sure that each event is only processed once? - Consumer group
each event is guaranteed to only be processed by one consumer in the group.

## Terminology

- brokers
- partitions: ordered,immutable sequence of messages
- topic: logical grouping of partitions

record: header/key/value/timestamp

that messages with the same key always go to the same partition, preserving order at the partition level

Kafka employs a leader-follower model for replication,

pull-based model.
it lets consumers control their consumption rate, simplifies failure handling, prevents overwhelming slow consumers, and enables efficient batching.

message size: recommende to under 1 MB

one broker: 1TB data, 1M message per second

hot partition - choose key - evenly distributeed

To scale a topic, increase the number of partitions.

how to handle hot partitions?

- random partitiong with no key. lose the ability to guarantee order of messages.
- salting the key
- compound key
- back pressure, slow down the producer.

acks=all

consumer down?
