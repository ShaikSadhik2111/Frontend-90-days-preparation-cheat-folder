# 19 — Trees

Trees are recursive structures. Each subtree is itself a tree, making recursion and DFS natural.

## Traversals

### Preorder: root → left → right
### Inorder: left → root → right
### Postorder: left → right → root
### Level order: BFS by depth

## Problem 1 — Inorder Traversal

```js
function inorder(root) {
  if (!root) return [];

  const result = [];

  function dfs(node) {
    if (!node) return;
    dfs(node.left);
    result.push(node.val);
    dfs(node.right);
  }

  dfs(root);
  return result;
}
```

## Problem 2 — Maximum Depth

```js
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

State returned by a subtree is its height.

## Problem 3 — Level Order

Use a queue and process one level at a time.

## Problem 4 — Balanced Binary Tree

Return subtree height, but propagate an invalid sentinel when the height difference exceeds one. This avoids repeatedly recalculating heights.

## Problem 5 — Diameter

At each node, combine left height + right height as a candidate path, while returning 1 + max child height to the parent.

## Problem 6 — Path Sum

Carry the remaining target or accumulated sum through recursion.

## Problem 7 — Validate BST

Do not only compare a node with its immediate children. Carry valid lower/upper bounds.

```js
function isValidBST(root, low = -Infinity, high = Infinity) {
  if (!root) return true;
  if (root.val <= low || root.val >= high) return false;

  return isValidBST(root.left, low, root.val) &&
         isValidBST(root.right, root.val, high);
}
```

## Problem 8 — Lowest Common Ancestor

For a general binary tree, recursively search both subtrees and combine whether p/q were found.

For a BST, ordering allows directional search.

## Additional
- Kth Smallest in BST
- Serialize/Deserialize Binary Tree
- Invert Binary Tree
- Right Side View

## Interview drill
For every DFS problem, state what the recursive function **returns to its parent**. This prevents many tree mistakes.

## Connection
Trees lead to **tries** for character-prefix trees and to **graphs** when parent/child restrictions are removed.
