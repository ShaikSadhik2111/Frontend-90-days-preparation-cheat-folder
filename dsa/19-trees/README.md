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

**Try it** (run with `node file.js` or in the browser console):

```js
const node = (val, left = null, right = null) => ({ val, left, right });
console.log(inorder(node(1, null, node(2, node(3))))); // → [1,3,2]
```

## Problem 2 — Maximum Depth

```js
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}
```

**Try it** (run with `node file.js` or in the browser console):

```js
const node = (val, left = null, right = null) => ({ val, left, right });
console.log(maxDepth(node(3, node(9), node(20, node(15), node(7))))); // → 3
console.log(maxDepth(null)); // → 0
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

**Try it** (run with `node file.js` or in the browser console):

```js
const node = (val, left = null, right = null) => ({ val, left, right });
console.log(isValidBST(node(2, node(1), node(3)))); // → true
console.log(isValidBST(node(5, node(1), node(4, node(3), node(6))))); // → false
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

---

## Full solutions — code, complexity, LeetCode

Node shape used below: `{ val, left, right }`. For each DFS, say **what the function returns to its parent**.

> **How to run any solution:** copy the helper (if shown), the function and its **Try it** lines into a file such as `practice.js`, then run `node practice.js` in the VS Code terminal. Or paste them into the browser console (F12 → Console). Each `console.log` shows the expected output in the comment after `→`.

### Helper used below

```js
// helper for local testing: build a tree from LeetCode's level-order array, e.g. [3,9,20,null,null,15,7]
function buildTree(values) {
  if (!values.length || values[0] === null) return null;
  const root = { val: values[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (i < values.length) {
    const node = queue.shift();
    for (const side of ["left", "right"]) {
      if (i < values.length && values[i] !== null) { node[side] = { val: values[i], left: null, right: null }; queue.push(node[side]); }
      i++;
    }
  }
  return root;
}
```

### Binary Tree Level Order Traversal — [LeetCode 102](https://leetcode.com/problems/binary-tree-level-order-traversal/)

**Idea:** BFS with a queue; process exactly `queue.length` nodes per loop to keep levels separate.

```js
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  let queue = [root];
  while (queue.length) {
    const next = [], level = [];
    for (const node of queue) {
      level.push(node.val);
      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    }
    result.push(level);
    queue = next;                 // swapping arrays avoids O(n) shift()
  }
  return result;
}
```

**Try it:**

```js
console.log(JSON.stringify(levelOrder(buildTree([3,9,20,null,null,15,7])))); // → [[3],[9,20],[15,7]]
console.log(JSON.stringify(levelOrder(null))); // → []
```

**Complexity:** Time O(n) · Space O(w) where w = max width.  
**Edge cases:** Empty tree → [].

### Binary Tree Right Side View — [LeetCode 199](https://leetcode.com/problems/binary-tree-right-side-view/)

**Idea:** Level-order traversal; take the **last node of each level**.

```js
function rightSideView(root) {
  const result = [];
  let queue = root ? [root] : [];
  while (queue.length) {
    result.push(queue[queue.length - 1].val);
    queue = queue.flatMap((n) => [n.left, n.right].filter(Boolean));
  }
  return result;
}
```

**Try it:**

```js
console.log(JSON.stringify(rightSideView(buildTree([1,2,3,null,5,null,4])))); // → [1,3,4]
console.log(JSON.stringify(rightSideView(buildTree([1,2,3,4])))); // → [1,3,4]
```

**Complexity:** Time O(n) · Space O(w).  
**Edge cases:** Left-leaning branch is visible when the right side is shorter.

### Invert Binary Tree — [LeetCode 226](https://leetcode.com/problems/invert-binary-tree/)

**Idea:** Swap left and right children at every node (pre- or post-order).

```js
function invertTree(root) {
  if (!root) return null;
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  return root;
}
```

**Try it:**

```js
console.log(JSON.stringify(levelOrder(invertTree(buildTree([4,2,7,1,3,6,9]))))); // → [[4],[7,2],[9,6,3,1]]
```

**Complexity:** Time O(n) · Space O(h).  
**Edge cases:** Empty tree.

### Balanced Binary Tree — [LeetCode 110](https://leetcode.com/problems/balanced-binary-tree/)

**Idea:** Return the height of each subtree, or **-1 as a sentinel** if it's already unbalanced — one pass, O(n).

```js
function isBalanced(root) {
  const height = (node) => {
    if (!node) return 0;
    const l = height(node.left);
    if (l === -1) return -1;
    const r = height(node.right);
    if (r === -1 || Math.abs(l - r) > 1) return -1;
    return 1 + Math.max(l, r);
  };
  return height(root) !== -1;
}
```

**Try it:**

```js
console.log(isBalanced(buildTree([3,9,20,null,null,15,7]))); // → true
console.log(isBalanced(buildTree([1,2,2,3,3,null,null,4,4]))); // → false
```

**Complexity:** Time O(n) · Space O(h).  
**Edge cases:** Empty tree is balanced.

### Diameter of Binary Tree — [LeetCode 543](https://leetcode.com/problems/diameter-of-binary-tree/)

**Idea:** At each node the longest path through it is `leftHeight + rightHeight`. Track the best in a variable; **return height** to the parent.

```js
function diameterOfBinaryTree(root) {
  let best = 0;
  const height = (node) => {
    if (!node) return 0;
    const l = height(node.left), r = height(node.right);
    best = Math.max(best, l + r);     // path through this node (in edges)
    return 1 + Math.max(l, r);        // what the parent needs
  };
  height(root);
  return best;
}
```

**Try it:**

```js
console.log(diameterOfBinaryTree(buildTree([1,2,3,4,5]))); // → 3
console.log(diameterOfBinaryTree(buildTree([1,2]))); // → 1
```

**Complexity:** Time O(n) · Space O(h).  
**Edge cases:** Diameter may not pass through the root.

### Path Sum — [LeetCode 112](https://leetcode.com/problems/path-sum/)

**Idea:** Subtract the node value from the target as you go down; at a **leaf** check whether the remainder is 0.

```js
function hasPathSum(root, targetSum) {
  if (!root) return false;
  const remaining = targetSum - root.val;
  if (!root.left && !root.right) return remaining === 0;   // leaf
  return hasPathSum(root.left, remaining) || hasPathSum(root.right, remaining);
}
```

**Try it:**

```js
console.log(hasPathSum(buildTree([5,4,8,11,null,13,4,7,2,null,null,null,1]),22)); // → true
console.log(hasPathSum(buildTree([1,2,3]),5)); // → false
console.log(hasPathSum(null,0)); // → false
```

**Complexity:** Time O(n) · Space O(h).  
**Edge cases:** Empty tree with target 0 → false (no root-to-leaf path).

### Lowest Common Ancestor of a Binary Tree — [LeetCode 236](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)

**Idea:** Return the node if it is p or q. If both subtrees return something, the current node is the LCA; otherwise pass up whichever side found something.

```js
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;     // p and q are on different sides
  return left ?? right;
}
```

**Try it:**

```js
const T=buildTree([3,5,1,6,2,0,8,null,null,7,4]);
console.log(lowestCommonAncestor(T,T.left,T.right).val); // → 3
console.log(lowestCommonAncestor(T,T.left,T.left.right.right).val); // → 5
```

**Complexity:** Time O(n) · Space O(h).  
**Edge cases:** p is an ancestor of q → returns p.

### Lowest Common Ancestor of a BST — [LeetCode 235](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

**Idea:** Use the ordering: if both values are smaller go left, both larger go right; otherwise this node splits them.

```js
function lowestCommonAncestorBST(root, p, q) {
  let node = root;
  while (node) {
    if (p.val < node.val && q.val < node.val) node = node.left;
    else if (p.val > node.val && q.val > node.val) node = node.right;
    else return node;
  }
  return null;
}
```

**Try it:**

```js
const S=buildTree([6,2,8,0,4,7,9,null,null,3,5]);
console.log(lowestCommonAncestorBST(S,{val:2},{val:8}).val); // → 6
console.log(lowestCommonAncestorBST(S,{val:2},{val:4}).val); // → 2
```

**Complexity:** Time O(h) · Space O(1).  
**Edge cases:** One node is the ancestor of the other.

### Kth Smallest Element in a BST — [LeetCode 230](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

**Idea:** In-order traversal of a BST visits values in sorted order — stop at the kth. Iterative with a stack lets you stop early.

```js
function kthSmallest(root, k) {
  const stack = [];
  let node = root;
  while (node || stack.length) {
    while (node) { stack.push(node); node = node.left; }
    node = stack.pop();
    if (--k === 0) return node.val;
    node = node.right;
  }
  return -1;
}
```

**Try it:**

```js
console.log(kthSmallest(buildTree([3,1,4,null,2]),1)); // → 1
console.log(kthSmallest(buildTree([5,3,6,2,4,null,null,1]),3)); // → 3
```

**Complexity:** Time O(h + k) · Space O(h).  
**Edge cases:** k = 1 (minimum).

### Serialize and Deserialize Binary Tree — [LeetCode 297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/)

**Idea:** Pre-order DFS writing `#` for null. Deserialize by reading tokens in the same order with an index.

```js
function serialize(root) {
  const out = [];
  const dfs = (node) => {
    if (!node) { out.push("#"); return; }
    out.push(node.val); dfs(node.left); dfs(node.right);
  };
  dfs(root);
  return out.join(",");
}

function deserialize(data) {
  const tokens = data.split(",");
  let i = 0;
  const build = () => {
    const t = tokens[i++];
    if (t === "#") return null;
    const node = { val: Number(t), left: null, right: null };
    node.left = build(); node.right = build();
    return node;
  };
  return build();
}
```

**Try it:**

```js
const s=serialize(buildTree([1,2,3,null,null,4,5]));
console.log(JSON.stringify(s)); // → "1,2,#,#,3,4,#,#,5,#,#"
console.log(JSON.stringify(levelOrder(deserialize(s)))); // → [[1],[2,3],[4,5]]
console.log(deserialize(serialize(null))); // → null
```

**Complexity:** Time O(n) · Space O(n).  
**Edge cases:** Empty tree → "#"; negative values.

> The **Try it** lines below use `buildTree` and `levelOrder` from earlier in this section.

### Same Tree — [LeetCode 100](https://leetcode.com/problems/same-tree/)

**Idea:** Two trees are equal if both roots are null, or both values match **and** left subtrees and right subtrees are equal.

```js
function isSameTree(p, q) {
  if (!p || !q) return p === q;          // both null → true; one null → false
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}
```

**Try it:**

```js
console.log(isSameTree(buildTree([1,2,3]),buildTree([1,2,3]))); // → true
console.log(isSameTree(buildTree([1,2]),buildTree([1,null,2]))); // → false
```

**Complexity:** Time O(n) · Space O(h).  
**Edge cases:** Same values, different shape → false.

### Symmetric Tree — [LeetCode 101](https://leetcode.com/problems/symmetric-tree/)

**Idea:** Compare the left subtree with the **mirror** of the right: outer pair (left.left, right.right) and inner pair (left.right, right.left).

```js
function isSymmetric(root) {
  const mirror = (a, b) => {
    if (!a || !b) return a === b;
    return a.val === b.val && mirror(a.left, b.right) && mirror(a.right, b.left);
  };
  return !root || mirror(root.left, root.right);
}
```

**Try it:**

```js
console.log(isSymmetric(buildTree([1,2,2,3,4,4,3]))); // → true
console.log(isSymmetric(buildTree([1,2,2,null,3,null,3]))); // → false
```

**Complexity:** Time O(n) · Space O(h).  
**Edge cases:** Empty tree → true.

### Subtree of Another Tree — [LeetCode 572](https://leetcode.com/problems/subtree-of-another-tree/)

**Idea:** At every node of `root`, check `isSameTree(node, subRoot)`. Reuses Same Tree.

```js
function isSubtree(root, subRoot) {
  if (!root) return false;
  return isSameTree(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}
```

**Try it:**

```js
console.log(isSubtree(buildTree([3,4,5,1,2]),buildTree([4,1,2]))); // → true
console.log(isSubtree(buildTree([3,4,5,1,2,null,null,null,null,0]),buildTree([4,1,2]))); // → false
```

**Complexity:** Time O(m·n) worst case · Space O(h). (Serialisation + string search can do O(m + n).)  
**Edge cases:** A matching shape with extra children below is not a subtree.

### Construct Binary Tree from Preorder and Inorder Traversal — [LeetCode 105](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/)

**Idea:** Preorder gives the **root first**. Its position in inorder splits the left and right subtrees. A Map from value → inorder index makes each split O(1).

```js
function buildTreeFromTraversals(preorder, inorder) {
  const indexOf = new Map(inorder.map((v, i) => [v, i]));
  let pre = 0;
  const build = (lo, hi) => {                    // inorder range [lo, hi]
    if (lo > hi) return null;
    const val = preorder[pre++];
    const mid = indexOf.get(val);
    const node = { val, left: null, right: null };
    node.left = build(lo, mid - 1);              // left first: matches preorder
    node.right = build(mid + 1, hi);
    return node;
  };
  return build(0, inorder.length - 1);
}
```

**Try it:**

```js
console.log(JSON.stringify(levelOrder(buildTreeFromTraversals([3,9,20,15,7],[9,3,15,20,7])))); // → [[3],[9,20],[15,7]]
console.log(JSON.stringify(levelOrder(buildTreeFromTraversals([-1],[-1])))); // → [[-1]]
```

**Complexity:** Time O(n) · Space O(n).  
**Edge cases:** Values are unique (required for the Map).
