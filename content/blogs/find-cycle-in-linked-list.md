---
title: Find cycle in the linked list
date: 2018-12-04
description: "Hello World"
tags: ["Algorithm"]
---

## Overview

There are some questions related to this topic in the leetcode. This Article introduces and proves the algorithm to find the cycle in the LinkedList.

## Algorithm

### Is there a cycle in the LinkedList

[141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)
The intuition is using fast-slow pointers. The slow pointer moves 1 step and the fast pointer moves 2 step in one round. If there is a cycle, the two pointers must meet, because the speed of two pointers is different.

```java
public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null) {
            return false;
        }
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                return true;
            }
        }
        return false;
    }
}
```

### Find the entrance of the cycle

The Algorithm is as bellow.

1. use fast-slow pointers untill the two pointers meet.
2. move the slow pointer to the head of the LinkedList.
3. let two pointers move 1 step each round.
4. When they meet again, the node is the entrance of the cycle.

```java
public class Solution {
    public ListNode detectCycle(ListNode head) {
        if (head == null) {
            return null;
        }
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                // move the slow to the head.
                slow = head;
                while (slow != fast) {
                    slow = slow.next;
                    fast = fast.next;
                }
                return slow;
            }
        }
        return null; // there is no cycle.
    }
}
```

#### Prove

The algorithm is not difficult, but it's hard to understand why it's right.
Let's prove it.
![image](https://user-images.githubusercontent.com/24699211/49480109-4fe2e080-f7da-11e8-85ea-a41e2cbc5331.png)
Assume:
head means the head of LinkedList.
entrance means the entrance of cycle.
encounter point means the place that slow meets fast.

x = the distance between the head and entrance.
y = the distance between entrance and encounter point.
s = the moving distance of slow pointer.
2s = the moving distance of fast pointer.
n = the number of circle when meeting.
r = the perimeter of cycle.

When slow meets fast, fast pointer runs n circly more than slow pointer.
**2s - s = nr (1)**

For slow pointer, when it meets fast pointer, it moves two distances.

- head => entrance (x)
- entrance => encounter point(y)

So, **s = x + y (2)**

combine (1) and (2), we can get **x = nr - y (3)**

Let's move the slow pointer to the head and let two pointers move 1 step each round. When slow moves x step, it reachs the entrance. At the same time, y moves `nr - y` steps according to (3). Let's consider the meaning of this formula `nr - y`.

- `nr` means the fast moves back to the encounter point after n circle.
- fast moves back `y` steps from encounter point, fast reaches entrance too.

It means when they meet again, the meet point is entrance of cycle.
