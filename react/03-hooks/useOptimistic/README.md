# useOptimistic (React 19)

> `const [optimistic, addOptimistic] = useOptimistic(state, updateFn)` shows a **temporary optimistic value** while an async action is in progress, and automatically falls back to the real state when it finishes (or fails).

```tsx
function Comments({ comments, sendComment }: { comments: Comment[]; sendComment: (text: string) => Promise<void> }) {
  const [optimisticComments, addOptimistic] = useOptimistic(
    comments,
    (current, text: string) => [...current, { id: "temp-" + Date.now(), text, pending: true }]
  );

  async function action(formData: FormData) {
    const text = String(formData.get("text"));
    addOptimistic(text);          // shows immediately
    await sendComment(text);      // parent updates `comments` when the server confirms
  }                                // if it throws, optimistic item disappears (handle the error/toast)

  return (
    <>
      <ul>{optimisticComments.map((c) => <li key={c.id} style={{ opacity: c.pending ? 0.5 : 1 }}>{c.text}</li>)}</ul>
      <form action={action}><input name="text" /><button>Send</button></form>
    </>
  );
}
```
- Must be called inside an Action / transition.
- Without React 19 (or with TanStack Query): `onMutate` → update cache optimistically, keep snapshot, `onError` → rollback, `onSettled` → invalidate.

## Optimistic UI checklist (interview)
1. Update UI immediately with a temporary id/`pending` flag.
2. Send request.
3. On success, replace temp with server data.
4. On failure, **roll back** and show an error with retry.
5. Handle concurrent edits/ordering (server version wins).

Next → [State management](../../04-state-management/local-state/README.md)
