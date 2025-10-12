---
title: Dunder method in Python
date: 2025-08-16
description: ""
tags: ["Python"]
visible: true
---

## What is dunder method

Python's dunder methods (short for "double underscore") such as `__init__` are special methods that allow you to define how objects of your classes behave with built-in operations and functions.

## Common dunder methods

### String Representation

| Method                   | Purpose                              | Example Usage                          |
| ------------------------ | ------------------------------------ | -------------------------------------- |
| `__str__(self)`          | Human-readable string representation | `str(obj)`, `print(obj)`               |
| `__repr__(self)`         | Unambiguous string representation    | `repr(obj)`, interactive shell display |
| `__format__(self, spec)` | Custom string formatting             | `f"{obj:spec}"`, `format(obj, spec)`   |
| `__bytes__(self)`        | Byte string representation           | `bytes(obj)`                           |

### In-Place Operations

| Method                  | Purpose           | Example Usage  |
| ----------------------- | ----------------- | -------------- |
| `__iadd__(self, other)` | In-place addition | `obj += other` |

e.g. `+=` will modify array in-place

```python

>>> nums = [1, 2]
>>> nums += [3, 4]
>>> nums
[1, 2, 3, 4]
```

### Iterator Operations

| Method           | Purpose              | Example Usage        |
| ---------------- | -------------------- | -------------------- |
| `__iter__(self)` | Make object iterable | `for item in obj`    |
| `__next__(self)` | Iterator protocol    | Used with `__iter__` |

### Hashing and Boolean

| Method                | Purpose              | Example Usage                  |
| --------------------- | -------------------- | ------------------------------ |
| `__hash__(self)`      | Make object hashable | `hash(obj)`, use in sets/dicts |
| `__eq__(self, other)` | Equality             | `obj == other`                 |

## Example: Allow class instance usable as dict's key

- For `__eq__`:

  - By default, `__eq__` compares object identity (same as `is`)
  - It only returns True if both variables refer to the exact same object in memory

- For `__hash__`:
  - By default, `__hash__` returns a hash based on the object's identity (memory address)
  - Implemented roughly as `hash(id(self))`

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def __eq__(self, other):
        if isinstance(other, Person):
            return self.name == other.name and self.age == other.age
        return False

    def __hash__(self):
        return hash((self.name, self.age))
```
