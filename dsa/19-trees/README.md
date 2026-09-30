# 19 — Trees

## Traversals
Preorder: root-left-right.
Inorder: left-root-right.
Postorder: left-right-root.
Level-order: BFS by depth.

## DFS
~~~js
function preorder(root) {
  if (!root) return [];

  const result = [root.val];
  result.push(...preorder(root.left));
  result.push(...preorder(root.right));
  return result;
}
~~~

The null check is the base case. Each recursive call processes one smaller subtree.

## BST
A binary search tree maintains an ordering relationship. Inorder traversal of a valid BST is sorted.

## Complexity
Traversal visits each node once: O(n). Recursive auxiliary space is O(h), where h is tree height.

## Problems
Maximum Depth, Invert Tree, Diameter, Level Order, Validate BST, Lowest Common Ancestor, Serialize/Deserialize.

## Pitfalls
Confusing binary tree with BST, confusing depth with height, forgetting null children, and assuming balanced height.

## Next
A trie specializes tree structure for prefix queries.