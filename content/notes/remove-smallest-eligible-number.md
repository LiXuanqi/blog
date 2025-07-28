---
title: Repeatedly remove the smallest eligible numer
date: 2025-06-22
description: ""
tags: ["Algorithm"]
visible: true
---

## Problem

Given a list with integers. e.g.

```python
nums = [3, 1, 4, 2]
```

Create a new list by repeatedly removing the smallest eligible number from the input list and appending to the new list.
The number is eligible when its value is greater than its neighbors' values.

Examples:

```python
nums = [3, 1, 4, 2]

# First pick: 3, 4 are eligible, so pick 3. nums = [1, 4, 2]
# Second pick: 4 are eligile, so pick 4, nums = [1, 2]
# Third pick: 2 is eligible
expected = [3, 4, 2, 1]
```

## Solution

```python
class Node:
    def __init__(self, val):
        self.prev = None
        self.next = None
        self.val = val

def solve(nums):
    eligible_nodes = [] # min heap
    head = Node(float('-inf')) # dummy head
    curr = head
    for index, num in enumerate(nums):
        new_node = Node(num)

        curr.next = new_node
        new_node.prev = curr

        curr = new_node

    curr = head


    while curr is not None:
        if is_eligible_node(curr):
            heapq.heappush(eligible_nodes, (curr.val, curr))

        curr = curr.next

    ans = []
    for _ in range(len(nums)):
        _, target_node = heapq.heappop(eligible_nodes)
        ans.append(target_node.val)
        # remove the target_node from list
        prev_node = target_node.prev
        next_node = target_node.next

        remove_node(target_node)

        # check the eligibility for its neighbors

        if is_eligible_node(prev_node):
            heapq.heappush(eligible_nodes, (prev_node.val, prev_node))
        if is_eligible_node(next_node):
            heapq.heappush(eligible_nodes, (next_node.val, next_node))


    return ans

def is_eligible_node(curr):
    if curr is None:
        return False

    left_eligible = True if curr.prev is None else (curr.prev.val < curr.val)
    right_eligible = True if curr.next is None else (curr.next.val < curr.val)
    return left_eligible and right_eligible

def remove_node(curr):
    prev_node = curr.prev
    next_node = curr.next
    curr.prev = None
    curr.next = None
    prev_node.next = next_node
    if next_node is not None:
        next_node.prev = prev_node


tests = [
    ([3, 1, 4, 2], [3, 4, 2, 1]),
    ([1], [1]),
    ([1, 2], [2, 1]),
    ([2, 1], [2, 1]),
]

for inputs, expected in tests:

    actual = solve(inputs)

    if actual != expected:
         print('Input: ' + str(inputs));
         print('Actual: ' + str(actual))
         print('Expected: ' + str(expected))

    assert actual == expected
```
