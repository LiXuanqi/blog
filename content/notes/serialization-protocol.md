---
title: Serialization Protocol
date: 2025-08-17
description: ""
tags: ["Others"]
visible: true
---

## What is serialization protocol

A protocol defines:

- Format specification: How different data types are represented
- Encoding rules: How to convert objects to bytes
- Versioning strategy: How to handle format evolution
- Type system: What data types are supported

## Binary protocols

```proto
message Address {
  string street = 1;
  string city = 2;
  int32 zip_code = 3;
}
```

Key insight: Field numbers (not names) are used in binary format - this enables schema evolution.

### Protocol Buffers (protobuf)

### MessagePack

- Self-describing binary format (no schema needed)
- Type information embedded in first few bits
- Similar to JSON but binary

### Apache Avro

## Text-Based Protocols

JSON, YAML, XML
