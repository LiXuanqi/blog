---
title: 4 Basic Sorting Algorithms
date: 2018-11-25
description: "An introduction to fundamental sorting algorithms with implementations and complexity analysis"
tags: ["Algorithm", "Sorting", "Data Structures"]
visible: true
---

## Overview

This article introduces four fundamental sorting algorithms:

- **Selection Sort** - Simple comparison-based algorithm
- **Merge Sort** - Efficient divide-and-conquer approach
- **Quicksort** - Fast in-place sorting algorithm
- **Bucket Sort** - Distribution-based sorting method

Practice these algorithms [here](https://www.lintcode.com/problem/sort-integers/description).

---

## Selection Sort

![Selection Sort Animation](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Selection_sort_animation.gif/250px-Selection_sort_animation.gif)

### Algorithm Overview

Selection sort divides the array into two parts:

- A sorted sublist (initially empty)
- An unsorted sublist (initially the entire array)

The algorithm repeatedly finds the smallest element in the unsorted sublist, swaps it with the leftmost unsorted element, and expands the sorted sublist boundary by one position.

### Implementation

```java
public class Solution {
    /**
     * @param A: an integer array
     * @return: nothing
     */
    public void sortIntegers(int[] A) {
        if (A == null || A.length == 0) {
            return;
        }

        // Place one element in its correct position per iteration
        for (int i = 0; i < A.length; i++) {
            int minIndex = findSmallest(A, i);
            swap(A, minIndex, i);
        }
    }

    private void swap(int[] A, int left, int right) {
        int temp = A[left];
        A[left] = A[right];
        A[right] = temp;
    }

    private int findSmallest(int[] A, int startIndex) {
        int minIndex = startIndex;
        for (int i = startIndex; i < A.length; i++) {
            if (A[i] < A[minIndex]) {
                minIndex = i;
            }
        }
        return minIndex;
    }
}
```

### Complexity Analysis

- **Time Complexity:** O(n²)
- **Space Complexity:** O(1)
- **Stability:** Unstable

---

## Merge Sort

![Merge Sort Animation](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)

### Algorithm Overview

Merge sort uses a divide-and-conquer strategy:

1. **Divide:** Split the array into two halves recursively until each subarray contains a single element
2. **Conquer:** Merge the sorted subarrays back together using two pointers

### Implementation

```java
public class Solution {
    /**
     * @param A: an integer array
     * @return: nothing
     */
    public void sortIntegers(int[] A) {
        if (A == null || A.length == 0) {
            return;
        }
        mergeSort(A, 0, A.length - 1, new int[A.length]);
    }

    private void mergeSort(int[] nums, int start, int end, int[] temp) {
        if (start >= end) {
            return;
        }

        int mid = start + (end - start) / 2;
        mergeSort(nums, start, mid, temp);
        mergeSort(nums, mid + 1, end, temp);
        merge(nums, start, end, temp);
    }

    private void merge(int[] nums, int start, int end, int[] temp) {
        int mid = start + (end - start) / 2;
        int index = start;
        int pointer1 = start;
        int pointer2 = mid + 1;

        // Merge two sorted halves
        while (pointer1 <= mid && pointer2 <= end) {
            if (nums[pointer1] < nums[pointer2]) {
                temp[index++] = nums[pointer1++];
            } else {
                temp[index++] = nums[pointer2++];
            }
        }

        // Copy remaining elements from left half
        while (pointer1 <= mid) {
            temp[index++] = nums[pointer1++];
        }

        // Copy remaining elements from right half
        while (pointer2 <= end) {
            temp[index++] = nums[pointer2++];
        }

        // Copy merged result back to original array
        for (int i = start; i <= end; i++) {
            nums[i] = temp[i];
        }
    }
}
```

### Key Design Decision

**Q: Why do we need the `temp` array?**

**A:** The merge operation cannot be performed in-place efficiently. The temporary array is created once at the beginning (not in `mergeSort()`) to avoid repeated allocations during recursion, improving performance.

### Complexity Analysis

**Time Complexity:** O(n log n)

- **Divide phase:** O(log n) levels in the recursion tree
- **Merge phase:** O(n) work per level to merge all elements
- **Total:** O(n) × O(log n) = O(n log n)

**Space Complexity:** O(n)

- Temporary array: O(n)
- Recursion call stack: O(log n)
- **Total:** O(n)

**Stability:** Stable

---

## Quicksort

![Quicksort Animation](https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif)

### Algorithm Overview

Quicksort follows these steps:

1. **Partition:** Choose a pivot element and rearrange the array so elements ≤ pivot are on the left, and elements ≥ pivot are on the right
2. **Recursion:** Recursively apply quicksort to both partitions

### Implementation

```java
public class Solution {
    /**
     * @param A: an integer array
     * @return: nothing
     */
    public void sortIntegers(int[] A) {
        if (A == null || A.length == 0) {
            return;
        }
        quickSort(A, 0, A.length - 1);
    }

    private void quickSort(int[] nums, int start, int end) {
        if (start >= end) {
            return;
        }

        int mid = start + (end - start) / 2;
        int pivot = nums[mid];
        int left = start;
        int right = end;

        while (left <= right) {
            while (left <= right && nums[left] < pivot) {
                left++;
            }
            while (left <= right && nums[right] > pivot) {
                right--;
            }
            if (left <= right) {
                swap(nums, left, right);
                left++;
                right--;
            }
        }

        quickSort(nums, start, right);
        quickSort(nums, left, end);
    }

    private void swap(int[] nums, int left, int right) {
        int temp = nums[left];
        nums[left] = nums[right];
        nums[right] = temp;
    }
}
```

### Critical Implementation Details

**Q: Why use `left <= right` instead of `left < right` in the outer while loop?**

**A:** Using `left < right` would leave overlapping ranges after partitioning. For example, with array `[1, 2]`, we'd end up calling `quickSort([1, 2])` again, causing infinite recursion. The `<=` ensures proper partition boundaries.

**Q: Why use `nums[left] < pivot` instead of `nums[left] <= pivot`?**

**A:** Using `<=` causes problems with duplicate elements. Consider `[1, 1, 1, 1, 1, 1]` with pivot `1`. The left pointer would reach the end without proper partitioning:

```
[1 1 1 1 1 1]
         r l
```

This results in `quickSort([start, right])` with nearly the full array, preventing problem size reduction and degrading performance.

### Complexity Analysis

- **Best/Average Time Complexity:** O(n log n)
- **Worst-Case Time Complexity:** O(n²) (when pivot consistently creates unbalanced partitions)
- **Space Complexity:** O(log n) average, O(n) worst case (recursion stack depth)
- **Stability:** Unstable

---

## Bucket Sort

Bucket sort is a distribution-based algorithm that works well when the input is uniformly distributed. Here's an example using bucket sort to solve a frequency-based problem.

### Example: Top K Frequent Elements

[LeetCode 347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)

```java
class Solution {
    public List<Integer> topKFrequent(int[] nums, int k) {
        List<Integer> result = new ArrayList<>();
        if (nums == null || nums.length == 0 || k <= 0) {
            return result;
        }

        // Count frequency of each element
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        // Create buckets indexed by frequency
        List<Integer>[] buckets = new List[nums.length + 1];
        for (int key : frequencyMap.keySet()) {
            int frequency = frequencyMap.get(key);
            if (buckets[frequency] == null) {
                buckets[frequency] = new ArrayList<>();
            }
            buckets[frequency].add(key);
        }

        // Collect top k frequent elements (iterate from highest frequency)
        for (int i = buckets.length - 1; i >= 0 && k > 0; i--) {
            if (buckets[i] != null) {
                result.addAll(buckets[i]);
                k -= buckets[i].size();
            }
        }

        return result;
    }
}
```

### Complexity Analysis

- **Time Complexity:** O(n)
- **Space Complexity:** O(n)
- **Stability:** Stable (depends on implementation)

---

## Summary

| Algorithm      | Best/Average Time | Worst Time | Space    | Stable |
| -------------- | ----------------- | ---------- | -------- | ------ |
| Selection Sort | O(n²)             | O(n²)      | O(1)     | No     |
| Merge Sort     | O(n log n)        | O(n log n) | O(n)     | Yes    |
| Quicksort      | O(n log n)        | O(n²)      | O(log n) | No     |
| Bucket Sort    | O(n + k)          | O(n²)      | O(n + k) | Yes    |

Choose the appropriate algorithm based on your specific requirements for time complexity, space constraints, and stability needs.
