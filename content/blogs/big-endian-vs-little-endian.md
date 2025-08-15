---
title: Big-Endian vs Little-Endian
date: 2025-07-29
description: ""
tags: ["OS"]
visible: true
---

## What is Endianness?

**Endianness** refers to the order in which bytes are stored in memory when representing multi-byte data types (like integers, floats, etc.).

e.g. we want to store the integer `0x12345678`

> Hexadecimal Representation:
> 0x12345678 is a 32-bit hexadecimal number, meaning it is represented by four bytes. Each byte is two hexadecimal digits (e.g., 12, 34, 56, 78).

```
Number: 0x12345678
Bytes:  12  34  56  78
```

Big-Endian (Most Significant Byte First)

```
Memory Address:  0x1000  0x1001  0x1002  0x1003
Byte Value:        12      34      56      78
```

Little-Endian (Least Significant Byte First)

```
Memory Address:  0x1000  0x1001  0x1002  0x1003
Byte Value:        78      56      34      12
```

## Why does this matter?

1. Cross-platform compatibility. e.g. x86/x64 use little-endian
2. Most network protocols use big-endian (called "network byte order")
3. File formats must specify endianness to be portable. e.g. PNG files use big-endian
