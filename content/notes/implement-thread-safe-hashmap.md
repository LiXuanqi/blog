---
title: Implement thread-safe hashmap
date: 2025-08-17
description: ""
tags: ["Others"]
visible: true
---

## Single Lock

```python
  Option 1: Single Lock (Simplest)
  import threading

  class TimeBasedKVStore:
      def __init__(self):
          self.key_to_versioned_values = collections.defaultdict(list)
          self._lock = threading.Lock()

      def set(self, key: str, value: str) -> None:
          with self._lock:
              timestamp = time.time()
              self.key_to_versioned_values[key].append(VersionedValue(timestamp, value))

      def get(self, key: str, timestamp: float) -> str:
          with self._lock:
              # existing get logic
```

## Read-write lock

```python
  Option 2: Reader-Writer Lock (Better Performance)
  import threading

  class TimeBasedKVStore:
      def __init__(self):
          self.key_to_versioned_values = collections.defaultdict(list)
          self._read_lock = threading.Lock()
          self._write_lock = threading.Lock()
          self._readers = 0

      def set(self, key: str, value: str) -> None:
          with self._write_lock:  # Exclusive write access
              # set logic

      def get(self, key: str, timestamp: float) -> str:
          # Multiple readers allowed simultaneously
          with self._read_lock:
              self._readers += 1
              if self._readers == 1:
                  self._write_lock.acquire()
          try:
              # get logic
          finally:
              with self._read_lock:
                  self._readers -= 1
                  if self._readers == 0:
                      self._write_lock.release()
```

## Per-key locks

```python
  Option 3: Per-Key Locks (Best Performance)
  class TimeBasedKVStore:
      def __init__(self):
          self.key_to_versioned_values = collections.defaultdict(list)
          self._key_locks = collections.defaultdict(threading.RLock)
          self._global_lock = threading.Lock()

      def set(self, key: str, value: str) -> None:
          with self._key_locks[key]:  # Only lock specific key
              # set logic
```

## Concurrent collections

```python
  Option 4: Concurrent Collections
  from concurrent.futures import ThreadPoolExecutor
  import queue

  class TimeBasedKVStore:
      def __init__(self):
          self._executor = ThreadPoolExecutor(max_workers=1)  # Serialize operations

      def set(self, key: str, value: str) -> None:
          return self._executor.submit(self._unsafe_set, key, value)
```
