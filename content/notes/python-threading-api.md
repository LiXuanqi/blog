---
title: Python threading API
date: 2025-08-17
description: ""
tags: ["Python"]
visible: true
---

## Start a thread

```python
import threading
import time

def worker_function(name):
    print(f"Worker {name} starting")
    time.sleep(2)
    print(f"Worker {name} finished")

# Create and start threads
thread1 = threading.Thread(target=worker_function, args=("A",))
thread2 = threading.Thread(target=worker_function, args=("B",))

thread1.start()
thread2.start()

# Wait for threads to complete
thread1.join()
thread2.join()

```

## Thread operations

```Python
# Thread creation with different approaches
t1 = threading.Thread(target=long_task)
t1.daemon = True  # Dies when main program exits
t1.start()

# Get current thread info
current = threading.current_thread()
print(f"Current thread: {current.name}")
print(f"Thread count: {threading.active_count()}")
print(f"All threads: {threading.enumerate()}")

# Check if thread is alive
print(f"Thread alive: {t1.is_alive()}")
```

## Lock

```python
lock = threading.Lock()

def increment():
    global counter
    for _ in range(100000):
        with lock:  # or lock.acquire() / lock.release()
            counter += 1
```

RLock:
A reentrant lock (also known as a recursive mutex or recursive lock) is a synchronization primitive that allows the same thread to acquire the lock multiple times without causing a deadlock.

## Synchronization Primitives

### Event

```python
event = threading.Event()

def waiter():
    print("Waiting for event...")
    event.wait()
    print("Event received!")

def setter():
    time.sleep(3)
    print("Setting event")
    event.set()

threading.Thread(target=waiter).start()
threading.Thread(target=setter).start()
```

### condition

```python
import threading
import time

condition = threading.Condition()
items = []

def consumer():
    with condition:
        while len(items) == 0:
            condition.wait()
        item = items.pop(0)
        print(f"Consumed {item}")

def producer():
    for i in range(5):
        time.sleep(1)
        with condition:
            items.append(f"item-{i}")
            print(f"Produced item-{i}")
            condition.notify()

threading.Thread(target=consumer).start()
threading.Thread(target=producer).start()
```

### Semaphore

## Thread-Safe Data Structures

### Queue (from queue module)

## Thread Local Storage

### threading.local()
