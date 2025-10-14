---
title: 4种基础排序算法
date: 2018-11-25
description: "介绍基础排序算法的实现和复杂度分析"
tags: ["算法", "排序", "数据结构"]
visible: true
---

## 概述

本文介绍四种基础排序算法：

- **选择排序** - 简单的基于比较的算法
- **归并排序** - 高效的分治法
- **快速排序** - 快速的原地排序算法
- **桶排序** - 基于分布的排序方法

在这里练习这些算法：[LintCode](https://www.lintcode.com/problem/sort-integers/description)

---

## 选择排序

![选择排序动画](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Selection_sort_animation.gif/250px-Selection_sort_animation.gif)

### 算法概述

选择排序将数组分为两部分：

- 已排序子列表（初始为空）
- 未排序子列表（初始为整个数组）

算法反复在未排序子列表中找到最小元素，将其与未排序部分的最左边元素交换，并将已排序子列表的边界扩展一个位置。

### 实现

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

        // 每次迭代将一个元素放在正确位置
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

### 复杂度分析

- **时间复杂度：** O(n²)
- **空间复杂度：** O(1)
- **稳定性：** 不稳定

---

## 归并排序

![归并排序动画](https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif)

### 算法概述

归并排序使用分治策略：

1. **分解：** 递归地将数组分成两半，直到每个子数组只包含一个元素
2. **合并：** 使用双指针将已排序的子数组合并回去

### 实现

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

        // 合并两个已排序的部分
        while (pointer1 <= mid && pointer2 <= end) {
            if (nums[pointer1] < nums[pointer2]) {
                temp[index++] = nums[pointer1++];
            } else {
                temp[index++] = nums[pointer2++];
            }
        }

        // 复制左半部分剩余元素
        while (pointer1 <= mid) {
            temp[index++] = nums[pointer1++];
        }

        // 复制右半部分剩余元素
        while (pointer2 <= end) {
            temp[index++] = nums[pointer2++];
        }

        // 将合并结果复制回原数组
        for (int i = start; i <= end; i++) {
            nums[i] = temp[i];
        }
    }
}
```

### 关键设计决定

**问：为什么我们需要 `temp` 数组？**

**答：** 归并操作无法高效地原地进行。临时数组在开始时创建一次（而不是在 `mergeSort()` 中），以避免在递归过程中重复分配，提高性能。

### 复杂度分析

**时间复杂度：** O(n log n)

- **分解阶段：** 递归树中有 O(log n) 层
- **合并阶段：** 每层需要 O(n) 的工作来合并所有元素
- **总计：** O(n) × O(log n) = O(n log n)

**空间复杂度：** O(n)

- 临时数组：O(n)
- 递归调用栈：O(log n)
- **总计：** O(n)

**稳定性：** 稳定

---

## 快速排序

![快速排序动画](https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif)

### 算法概述

快速排序遵循以下步骤：

1. **分区：** 选择一个基准元素，重新排列数组使得 ≤ 基准的元素在左侧，≥ 基准的元素在右侧
2. **递归：** 对两个分区递归应用快速排序

### 实现

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

### 关键实现细节

**问：为什么在外层 while 循环中使用 `left <= right` 而不是 `left < right`？**

**答：** 使用 `left < right` 会在分区后留下重叠范围。例如，对于数组 `[1, 2]`，我们会再次调用 `quickSort([1, 2])`，导致无限递归。`<=` 确保了正确的分区边界。

**问：为什么使用 `nums[left] < pivot` 而不是 `nums[left] <= pivot`？**

**答：** 使用 `<=` 会导致重复元素的问题。考虑 `[1, 1, 1, 1, 1, 1]` 且基准为 `1`。左指针会到达末尾而没有正确分区：

```
[1 1 1 1 1 1]
         r l
```

这会导致 `quickSort([start, right])` 使用几乎完整的数组，阻止问题规模减少并降低性能。

### 复杂度分析

- **最佳/平均时间复杂度：** O(n log n)
- **最坏情况时间复杂度：** O(n²)（当基准始终创建不平衡分区时）
- **空间复杂度：** 平均 O(log n)，最坏情况 O(n)（递归栈深度）
- **稳定性：** 不稳定

---

## 桶排序

桶排序是一种基于分布的算法，当输入均匀分布时效果很好。这里是使用桶排序解决基于频率问题的示例。

### 示例：前 K 个高频元素

[LeetCode 347. 前 K 个高频元素](https://leetcode.com/problems/top-k-frequent-elements/)

```java
class Solution {
    public List<Integer> topKFrequent(int[] nums, int k) {
        List<Integer> result = new ArrayList<>();
        if (nums == null || nums.length == 0 || k <= 0) {
            return result;
        }

        // 统计每个元素的频率
        Map<Integer, Integer> frequencyMap = new HashMap<>();
        for (int num : nums) {
            frequencyMap.put(num, frequencyMap.getOrDefault(num, 0) + 1);
        }

        // 创建按频率索引的桶
        List<Integer>[] buckets = new List[nums.length + 1];
        for (int key : frequencyMap.keySet()) {
            int frequency = frequencyMap.get(key);
            if (buckets[frequency] == null) {
                buckets[frequency] = new ArrayList<>();
            }
            buckets[frequency].add(key);
        }

        // 收集前 k 个高频元素（从最高频率开始迭代）
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

### 复杂度分析

- **时间复杂度：** O(n)
- **空间复杂度：** O(n)
- **稳定性：** 稳定（取决于实现）

---

## 总结

| 算法     | 最佳/平均时间 | 最坏时间   | 空间     | 稳定 |
| -------- | ------------- | ---------- | -------- | ---- |
| 选择排序 | O(n²)         | O(n²)      | O(1)     | 否   |
| 归并排序 | O(n log n)    | O(n log n) | O(n)     | 是   |
| 快速排序 | O(n log n)    | O(n²)      | O(log n) | 否   |
| 桶排序   | O(n + k)      | O(n²)      | O(n + k) | 是   |

根据您对时间复杂度、空间约束和稳定性需求的具体要求选择合适的算法。
