---
title: Basic calculator I, II, III
date: 2019-01-01
description: "Hello World"
tags: ["Algorithm"]
visible: true
---

## Basic Calculator

[Leetcode 224. Basic Calculator](https://leetcode.com/problems/basic-calculator/)

### How to handle `()` ?

For '(', we need to store usefull informations such as `the number before (` and `the sign before '('` ,and open a new space for calculating. It's like callstack in computer. For this question.
For ')', we need combinate the result in this round and last round.

### How to handle sign?

There are only '+' and '-', we use `int sign` to do it. `1` represents `+`, '-1' represents `-`

### Solution

```java
class Solution {
    public int calculate(String s) {
        Deque<Integer> stack = new LinkedList<>();
        int sign = 1; // '1' represents '+', '-1' represents '-'
        int res = 0; // store temp result.
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                // read number and calculate.
                int num = 0;
                while (i < s.length() && Character.isDigit(s.charAt(i))) {
                    num = num * 10 + s.charAt(i) - '0';
                    i++;
                }
                i--; // notice!
                res += sign * num;
            } else if (c == '+') {
                sign = 1;

            } else if (c == '-') {
                sign = -1;
            } else if (c == '(') {
                // open a new space for calculating.
                stack.offerFirst(sign); // sign before '('
                stack.offerFirst(res);
                sign = 1;
                res = 0;
            } else if (c == ')') {
                int prevNum = stack.pollFirst();
                int signBeforeParenthese = stack.pollFirst();
                res = prevNum + signBeforeParenthese * res;
            }
        }
        return res;
    }
}
```

## Basic Calculator II

[Leetcode 227. Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/)

### How to handle `*` and `/`?

For `*` and `/`, we need know the number before them to calculate, so we use a stack to store these numbers.

```java
class Solution {
    public int calculate(String s) {
        Deque<Integer> stack = new LinkedList<>();
        char sign = '+';
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                // read number.
                int num = 0;
                while (i < s.length() && Character.isDigit(s.charAt(i))) {
                    num = num * 10 + s.charAt(i) - '0';
                    i++;
                }
                i--;
                if (sign == '+') {
                    stack.offerFirst(num);
                } else if (sign == '-') {
                    stack.offerFirst(-num);
                } else if (sign == '*') {
                    int prev = stack.pollFirst();
                    stack.offerFirst(prev * num);
                } else if (sign == '/') {
                    int prev = stack.pollFirst();
                    stack.offerFirst(prev / num);
                }
            } else if (c == ' ') {
                continue;
            } else {
                sign = c;
            }
        }
        int res = 0;
        while (!stack.isEmpty()) {
            res += stack.pollFirst();
        }
        return res;
    }
}
```

## Basic Calculator III

[Leetcode 772. Basic Calculator III](https://leetcode.com/problems/basic-calculator-iii/)

```java
class Solution {
    public int calculate(String s) {
        Deque<Long> nums = new LinkedList<>();
        Deque<Character> signs = new LinkedList<>();
        char sign = '+';
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            if (Character.isDigit(c)) {
                // read number
                long num = 0;
                while (i < s.length() && Character.isDigit(s.charAt(i))) {
                    num = num * 10 + s.charAt(i) - '0';
                    i++;
                }
                i--;
                if (sign == '+') {
                    nums.offerFirst(num);
                } else if (sign == '-') {
                    nums.offerFirst(-num);
                } else if (sign == '*') {
                    long prev = nums.pollFirst();
                    nums.offerFirst(prev * num);
                } else if (sign == '/') {
                    long prev = nums.pollFirst();
                    nums.offerFirst(prev / num);
                }
            } else if (c == '(') {
                // open a new space.
                nums.offerFirst(Long.MAX_VALUE); // mark division of spaces.
                signs.offerFirst(sign); // store sign before parenthese.
                sign = '+';
            } else if (c == ')') {
                long total = 0;
                while (!nums.isEmpty() && nums.peekFirst() != Long.MAX_VALUE) {
                    total += nums.pollFirst();
                }
                nums.pollFirst(); // poll Long.MAX_VALUE.
                char prevSign = signs.pollFirst();
                if (prevSign == '+') {
                    nums.offerFirst(total);
                } else if (prevSign == '-') {
                    nums.offerFirst(-total);
                } else if (prevSign == '*') {
                    nums.offerFirst(nums.pollFirst() * total);
                } else if (prevSign == '/') {
                    nums.offerFirst(nums.pollFirst() / total);
                }
            } else if (c == ' ') {
                continue;
            } else {
                sign = c;
            }
        }
        long res = 0;
        while (!nums.isEmpty()) {
            res += nums.pollFirst();
        }
        return (int) res;
    }
}
```

## Similar Questions

[Leetcode 394. Decode String](https://leetcode.com/problems/decode-string/)
