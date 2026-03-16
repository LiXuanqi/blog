---
title: Union Find
date: 2023-12-02
description: "Union-Find is a data structure for managing disjoint subsets with two operations: find(x) returns which set an element belongs to, and union(x, y) merges two sets. Key optimizations include path compression (flattening trees during lookups) and union by rank (attaching smaller trees to larger ones), achieving nearly O(1) amortized time complexity per operation."
tags: ["Algorithm"]
visible: true
---

## Introduction

Union-Find, also known as **Disjoint-Set** Data Structure, is a data structure that helps solve the problem of partitioning a set into disjoint subsets. It provides efficient operations to determine whether two elements belong to the same subset and to merge (or union) two subsets together.

It has 2 main operations:

- find(x): Finds and returns the representative (also known as the root) of the subset to which element x belongs
- union(x, y): Merges the subsets containing elements x and y into a single subset.

## Basic version

```python
class UnionFind:
    def __init__(self, n):
        # 1. Initialization
        self.parent = list(range(n))

    def find(self, x):
        # 2. Find
        # the parent of root node is itself
        if self.parent[x] == x:
            return x
        else:
            return self.find(self.parent[x])

    def union(self, x, y):
        # 3. Union
        parent_x = self.find(x)
        parent_y = self.find(y)
        self.parent[parent_x] = parent_y

```

1. Initialization: Every node is not connected and in its own set, so set the parent to itself.
2. Find: recursively find the root of current node. The connected nodes will share the same root.
3. Union: Connect 2 nodes together by connecting their roots.

## Optimization

The Basic version has the problem - Trees can become very tall (like a linked list).
The Union-Find data structure employs two key optimization techniques: path compression and union by rank.

### Path Compression

Path compression helps flatten the tree structure formed by subsets, reducing the time complexity of subsequent Find operations.

```python
def find_with_path_compression(self, x):
    if self.parent[x] != x:
        self.parent[x] = self.find(self.parent[x])
    return self.parent[x]
```

Find the root of current node and update the parent of all nodes in the path to the root.

### Union by Rank/Size

Optimization: attach the smaller tree under the larger one.

Two variants:

- Union by size → attach smaller set to larger set
- Union by rank → attach shallower tree under deeper tree

## Algorithm Complexity

Time complexity:

| Implementation          | find        | union       | m operations         |
| ----------------------- | ----------- | ----------- | -------------------- |
| Naive                   | O(n)        | O(n)        | O(mn)                |
| Union by Rank           | O(log n)    | O(log n)    | O(m log n)           |
| Path Compression only   | ~O(log n)   | ~O(log n)   | ~O(m log n)          |
| Rank + Path Compression | **O(α(n))** | **O(α(n))** | **O(m α(n)) ≈ O(m)** |

Space complexity: O(n)

## Related questions

- [LC323](https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/description/): number of sets
- count the number of connected component nodes which include node a
- 2d array
- [LC827](https://leetcode.com/problems/making-a-large-island/description/): 2d array + maintain size

## Reference

- [wikipedia](https://en.wikipedia.org/wiki/Disjoint-set_data_structure)
- [OI Wiki](https://oi-wiki.org/ds/dsu/)
