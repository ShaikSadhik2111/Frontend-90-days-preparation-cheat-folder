# 24 — Application-level components

Bigger prompts that combine several skills:

| Prompt | Skills combined |
|---|---|
| Todo / task manager | reducer, filters, edit, persistence, keyboard |
| Shopping cart + product list | derived totals, quantity updates, localStorage, optimistic add |
| Comment thread (nested replies) | **recursive components**, tree updates by id, collapse |
| File explorer tree | recursion, expand/collapse, add/rename/delete nodes, ARIA tree |
| Multi-step wizard | shared form state, per-step validation, progress, review step |
| Notification/toast system | context provider, queue, timers, portal, `aria-live` |
| Dashboard with widgets | layout grid, independent loading/error per widget, polling |
| Chat UI | message list anchored to bottom, optimistic send, status ticks |
| Image gallery / carousel | lazy loading, keyboard, autoplay with pause |
| Kanban | DnD, columns, persistence |

## Recursive tree update (comments / file explorer)
```ts
type Node = { id: string; name: string; children?: Node[] };
function updateNode(nodes: Node[], id: string, fn: (n: Node) => Node): Node[] {
  return nodes.map((n) => (n.id === id ? fn(n) : n.children ? { ...n, children: updateNode(n.children, id, fn) } : n));
}
// add child: updateNode(tree, parentId, (n) => ({ ...n, children: [...(n.children ?? []), newNode] }))
```
For large trees: normalise (`byId` + `childIds`) → O(1) updates.

Next → [25 Advanced concurrency](../25-advanced-concurrency/README.md)
