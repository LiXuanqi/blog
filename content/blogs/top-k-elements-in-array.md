---
title: The top k elements in array
date: 2023-08-15
description: "Hello World"
tags: ["Algorithm"]
visible: true
---

## Problem

Given a list of elements, we need return the top k elements in any order.

For example,

```python
nums = [2, 4, 7, 1, 3, 10]
k = 3
```

Let's find the top k **smallest** elements.

```python
return = [1, 2, 3]
```

Sometimes, we problem hava different definitions of 'top', e.g. [Leetcode 973. K Closest Points to Origin](https://leetcode.com/problems/k-closest-points-to-origin/). The order is the distance to origin `√(x1 - x2)^2 + (y1 - y2)^2)` in this case.

Let's define the helper function to calculate.

```python
def distance_to_origin(point):
    return point[0] ** 2 + point[1] ** 2
```

In following sections, we will discuss this problem as an example.

## Solution 1: heapify and min heap

Steps:

1. Make all points to a **min** heap.
2. pop k elements out of heap.

```python
class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        points = [(distance_to_origin(point), point) for point in points]
        heapq.heapify(points)
        ans = []
        for _ in range(k):
            ans.append(heapq.heappop(points)[1])

        return ans
```

In this way, the heapify takes `O(n)` time. And the heap with size `n` (the size of all points), we will pop k times from heap, which takes `O(klogn)` time.

The total time complexity is `O(n + klogn)`

The space complexity is `O(n)`, costed by heap.

## Solution 2: max heap

```python
class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        max_heap = []
        for point in points:
            distance = distance_to_origin(point)
            heapq.heappush(max_heap, (-distance, point))
            # maintain max_heap with size k
            while len(max_heap) > k:
                heapq.heappop(max_heap)

        return [item[1] for item in max_heap]
```

## Solution 3: quick select

```python
class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        points = [(distance_to_origin(point), point) for point in points]
        quick_select(points, 0, len(points) - 1, k)
        return [point[1] for point in points[:k]]

def quick_select(points, start, end, k):

    if start >= end:
        return

    left = start
    right = end
    mid = (left + right) // 2
    pivot = points[mid][0]
    while left <= right:
        while left <= right and points[left][0] < pivot:
            left += 1

        while left <= right and points[right][0] > pivot:
            right -= 1

        # swap
        if left <= right:
            temp = points[left]
            points[left] = points[right]
            points[right] = temp
            left += 1
            right -= 1

    if right >= k:
        quick_select(points, start, right, k)
    elif k >= left:
        quick_select(points, left, end, k)
```
