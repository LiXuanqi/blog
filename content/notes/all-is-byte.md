---
title: All is Byte
date: 2025-08-15
description: ""
tags: ["OS"]
visible: true
---

Every song streaming through your headphones, every photo on your phone, every word you're reading right now—they all share one fundamental truth: they exist as bytes

## What is byte?

1 byte = 8 bits

## Byte Representation Methods

| Decimal | Binary   | Hexadecimal |
| ------- | -------- | ----------- |
| 65      | 01000001 | 41          |
| 175     | 10101111 | AF          |
| 202     | 11001010 | CA          |
| 254     | 11111110 | FE          |
| 171     | 10101011 | AB          |
| 255     | 11111111 | FF          |

## Convertion

### Decimal to Binary

Method: Repeated Division by 2

Example: Convert 65 to binary

```
65 ÷ 2 = 32 remainder 1
32 ÷ 2 = 16 remainder 0
16 ÷ 2 = 8  remainder 0
8 ÷ 2  = 4  remainder 0
4 ÷ 2  = 2  remainder 0
2 ÷ 2  = 1  remainder 0
1 ÷ 2  = 0  remainder 1

```

Reading remainders from bottom to top: 1000001

For bytes, we pad with zeros to make 8 digits: 01000001

Decimal to Hex is same but repeated division by 16, and map the remainder with bellow table.

```
0=0  1=1  2=2  3=3  4=4  5=5  6=6  7=7
8=8  9=9  10=A  11=B  12=C  13=D  14=E  15=F
```

### Binary to Hexadecimal

Method: Group by 4 bits

```
0000 = 0    0100 = 4    1000 = 8    1100 = C
0001 = 1    0101 = 5    1001 = 9    1101 = D
0010 = 2    0110 = 6    1010 = A    1110 = E
0011 = 3    0111 = 7    1011 = B    1111 = F
```

Example: Convert 10101111 (binary) to hex

```
Split into 4-bit groups: 1010 | 1111

- 1010 = A
- 1111 = F

Result: AF
```

## Primitive types in bytes

All primitive data types—integers, characters, floats, strings—require conversion to byte representation before they can be stored on disk or in memory.

### Integer

Integer size variants by languages.

Java:

- byte: 1 byte
- short: 2 bytes
- int: 4 bytes
- long: 8 bytes

Rust(Explicit sizing): e.g. i8/u8 : 1 byte

Python: variable size. Can grow as large as memory allows. see [code](https://github.com/python/cpython/blob/8665769614183263a4370b35a4fdbe852e651e17/Include/cpython/longintrepr.h#L95)

### Float

IEEE 754 Standard

```
Single Precision (32-bit float)
| Sign | Exponent | Mantissa/Fraction |
|  1   |    8     |        23         |

Double Precision (64-bit float)
| Sign | Exponent | Mantissa/Fraction |
|  1   |    11    |        52         |
```

The formula is: (-1)^sign × (1 + fraction) × 2^(exponent - bias)

For 32-bit floats: Bias = 127
For 64-bit floats: Bias = 1023

Why use bias? small number need negative exponents.

#### Manual conversion

```
5.75

5.75 = 5 + 0.75

# Integer part (5)

5 ÷ 2 = 2 remainder 1
2 ÷ 2 = 1 remainder 0
1 ÷ 2 = 0 remainder 1
→ 5 = 101₂

Fractional part (0.75)

0.75 × 2 = 1.5  → take 1, left with 0.5
0.5  × 2 = 1.0  → take 1, left with 0.0
→ 0.75 = .11₂

Combined: 5.75 = 101.11₂

Step : Normalize to Scientific Notation
101.11₂ = 1.0111₂ × 2²

Mantissa: 0111 (the part after "1.")
Exponent: 2

Step : Apply IEEE 754 Format
Sign bit: 0 (positive)
Exponent: 2 + 127 = 129 = 10000001₂
Mantissa: Pad 0111 to 23 bits: 01110000000000000000000

Step 4: Combine All Parts
Sign | Exponent  | Mantissa
  0  | 10000001  | 01110000000000000000000
```

### Char and String

char and string cannot directly represents as bytes, so we need encoding first.

#### What is Encoding?

Encoding is the process of converting characters and symbols into a format that computers can store and process - essentially mapping human-readable text to bytes (numbers).

| Encoding System | Bit Size | Character Support                                   | Total Characters |
| --------------- | -------- | --------------------------------------------------- | ---------------- |
| ASCII           | 7-bit    | English only: A-Z, a-z, 0-9, basic symbols          | 128              |
| Extended ASCII  | 8-bit    | ASCII + additional characters (varies by code page) | 256              |
| Unicode         | Variable | Universal character set for ALL languages           | 1,400,000+       |

Unicode is great, but it creates a new challenge - How to store these numbers efficiently?

#### Unicode Encoding Schemes

Unicode defines what number each character gets, but encoding schemes define how to store those numbers as bytes.

UTF-8 (Variable Length: 1-4 bytes)
How it works:

- ASCII characters (0-127): 1 byte
- Extended Latin (128-2047): 2 bytes
- Most other languages (2048-65535): 3 bytes
- Rare characters/emojis (65536+): 4 bytes

```
'A' (U+0041)     → 01000001                    (1 byte)
'ñ' (U+00F1)     → 11000011 10110001           (2 bytes)
'中' (U+4E2D)     → 11100100 10111000 10101101  (3 bytes)
'😀' (U+1F600)    → 11110000 10011111 10011000 10000000 (4 bytes)
```

Advantages:

- Space-efficient for English text
- Backward compatible with ASCII
- Most popular on the web

UTF-16 (Variable Length: 2 or 4 bytes)
How it works:

- Common characters (0-65535): 2 bytes
- Rare characters (65536+): 4 bytes (surrogate pairs)

```
'A' (U+0041)     → 00000000 01000001           (2 bytes)
'中' (U+4E2D)     → 01001110 00101101           (2 bytes)
'😀' (U+1F600)    → 11011000 00111101 11011110 00000000 (4 bytes - surrogate pair)
```

Surrogate Pairs:
For characters beyond U+FFFF, UTF-16 uses two 16-bit units:

```
😀 (U+1F600) becomes:
High surrogate: 0xD83D
Low surrogate:  0xDE00
```

UTF-32 (Fixed Length: 4 bytes)
How it works:

- Every character uses exactly 4 bytes
- Direct storage of Unicode code point

It's simple but space inefficient

#### Byte pattern rules

Variable-length encoding schemes face an additional challenge: determining how many bytes to read for each character

The solution is built into the encoding scheme itself through self-describing byte patterns.

**UTF-8 Byte pattern Rules**

| First Byte Pattern | Meaning                   | Total Bytes | Character Range          |
| ------------------ | ------------------------- | ----------- | ------------------------ |
| `0xxxxxxx`         | Single byte character     | 1           | U+0000 to U+007F (ASCII) |
| `110xxxxx`         | Start of 2-byte character | 2           | U+0080 to U+07FF         |
| `1110xxxx`         | Start of 3-byte character | 3           | U+0800 to U+FFFF         |
| `11110xxx`         | Start of 4-byte character | 4           | U+10000 to U+10FFFF      |
| `10xxxxxx`         | Continuation byte         | -           | (Not a start byte)       |

Reading Algorithm

When reading UTF-8 bytes:

1. Look at the first byte
2. Count leading 1s to determine how many bytes to read
3. Read that many bytes total
4. Decode the character

e.g.

```
Bytes: [11100100, 10111000, 10101101]
Step 1: First byte = 11100100
Step 2: Starts with 1110 → 3 byte character
Step 3: Read 3 bytes total
Result: '中'
```

#### Programming language choices

- Python strings (UTF-8 externally, optimized internally) e.g. Latin-1, USC-2, USC-4
- Java (UTF-16 internally)
- Rust (UTF-8 for strings, UTF-32 for chars):
