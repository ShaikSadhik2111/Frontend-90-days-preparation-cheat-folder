# 19 — Optimistic UI (machine-coding version)

```tsx
async function toggleLike(postId: string) {
  const previous = posts;                                         // snapshot
  setPosts((ps) => ps.map((p) => (p.id === postId ? { ...p, liked: !p.liked, likes: p.likes + (p.liked ? -1 : 1) } : p)));
  try {
    const updated = await api.toggleLike(postId);                 // server truth
    setPosts((ps) => ps.map((p) => (p.id === postId ? updated : p)));
  } catch {
    setPosts(previous);                                           // rollback
    toast.error("Couldn't update like. Try again.");
  }
}
```
Caveat: restoring a whole snapshot can wipe other concurrent changes → prefer reverting just that item, or use a pending map keyed by id. Disable/dedupe rapid repeated clicks. Show pending state (opacity). For adds: temp id → replace with server id.

Concepts: [system-design/13-optimistic-updates](../../system-design/13-optimistic-updates/README.md).

Next → [20 Real-time UI](../20-real-time-ui/README.md)
