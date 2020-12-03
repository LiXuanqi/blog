---
title: Traverse binary tree without recursion
slug: traverse-binary-tree-without-recursion
date: 2018-11-22T06:55:47.732Z
tags:
  - Algorithm
language: en
---
## Questions

[LeetCode144 - Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/description/)

[LeetCode94 - Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/description/)

[LeetCode145 - Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/description/)



## Preorder Traversal

we should visit the node as the order like `root - left - right`, which means every time we meet a node, we can firstly print his value(or do other operations with its value). and then we should visit his left and right. We can use a `Stack` to help us. In order to visit left firstly, we should offer the `right` into `Stack` firstly, and then `left`. 

Some tips:

1. we only print value when the node is polled out from stack.
2. after print value, we will offer his right and left back to stack, then order should be `right - left`.

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



## Inorder Traversal

Inorder traversal means we should visit the node as the mode `left - root - right`, which means for every node, if it has left node, we can't visit his value until all of his left nodes have been visited. So we use a `TreeNode helper` to help us. 

Some tips:

1. if helper has left, we always go left and offer the node into stack.
2. only when helper is null, we can poll element from stack. this time, we can visit the value of the node.
3. after visit the value of node, we should check its right node, if there is right node, we should make `helper == curr.right` and do the process again. 

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

## Postorder Traversal

Firstly, let's think when can we print the value?

1. left == null && right == null
2. come back from left && right == null
3. come back from right

So the key to solve the problem is knowing the directon of our traversal. We can use a `prev` to help us.

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



## Similar Questions

[Leetcode230 - Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/description/)

[Leetcode589 - N-ary Tree Preorder Traversal](https://leetcode.com/problems/n-ary-tree-preorder-traversal/description/)