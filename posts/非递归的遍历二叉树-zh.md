---
title: 非递归的遍历二叉树
slug: traverse-binary-tree-without-recursion
date: 2018-11-22T07:11:00.000Z
tags:
  - Algorithm
language: zh
---

## 问题

[LeetCode144 - Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/description/)

[LeetCode94 - Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/description/)

[LeetCode145 - Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/description/)



## 前序遍历（Preorder Traversal）

前序遍历: 中-左-右

这意味着每当我们遇到一个结点，就可以打印它。然后因为我们想要先访问其左子树的所有 节点，然后访问右子树的所有节点。所以我们可以借助栈（stack）的帮忙。先将右子树放 入栈中，再放入左子树。(先进后出)

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if (root == null) {
            return ans;
        }
        Deque<TreeNode> stack = new LinkedList<>();
        stack.offerFirst(root);
        while (!stack.isEmpty()) {
            TreeNode curr = stack.pollFirst();
            ans.add(curr.val);
            if (curr.right != null) {
                stack.offerFirst(curr.right);
            }
            if (curr.left != null) {
                stack.offerFirst(curr.left);
            }
        }
        return ans;
    }
}
```



## 中序遍历（Inorder Traversal）

中序遍历： 左-中-右

这意味着对于每一个节点，如果有左子树存在，就不能打印，直到所有左子树均已被打印为 止。我们可以用`helper node`来帮助我们完成这件事。

步骤：

1. 有左子树，将左子树放到栈中。
2. 没有左子树，从栈中拿出一个node打印。
3. 检查被拿出的node的右子树，如果存在，则把helper移到右子树。

重复上述过程，直到所有节点均被打印。

```java
class Solution {
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if (root == null) {
            return ans;
        }
        TreeNode helper = root;
        Stack<TreeNode> stack = new Stack<>();
        // helper != null means it maybe push new nodes to stack.
        while (!stack.isEmpty() || helper != null) {
            while (helper != null) {
                stack.push(helper);
                helper = helper.left;
            }
            TreeNode curr = stack.pop();
            ans.add(curr.val);
            helper = curr.right;
        }
        return ans;
    }
}
```

## 后序遍历（Postorder Traversal）

后序遍历： 左-右-中

我们首先来思考什么时候可以打印node的值？

1. 叶子节点，没有左右子树的时候（left == null && right == null）
2. 只有左子树，且左子树均已被遍历过
3. 左右子树同时存在，但都已被遍历过

从上述规则中，我们可以看出遍历的方向非常重要，因此我们用一个`prev`指针来帮助我 们。

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        if (root == null) {
            return ans;
        }
        TreeNode prev = null;
        Deque<TreeNode> stack = new LinkedList<>();
        stack.offerFirst(root);
        while (!stack.isEmpty()) {
            TreeNode curr = stack.peekFirst();
            // go down
            if (prev == null || prev.left == curr || prev.right == curr) {
                if (curr.left != null) {
                    stack.offerFirst(curr.left);
                } else if (curr.right != null) {
                    stack.offerFirst(curr.right);
                } else {
                    ans.add(curr.val);
                    stack.pollFirst();
                }   
            } else if (curr.left == prev) { // from left subtree
                if (curr.right != null) {
                    stack.offerFirst(curr.right);
                } else {
                    ans.add(curr.val);
                    stack.pollFirst(); 
                }
            } else { // from right subtree
                 ans.add(curr.val);
                 stack.pollFirst(); 
            }
            prev = curr;
        }
        return ans;
    }
}
```



## 相关问题

[Leetcode230 - Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/)

[Leetcode589 - N-ary Tree Preorder Traversal](https://leetcode.com/problems/n-ary-tree-preorder-traversal/description/)