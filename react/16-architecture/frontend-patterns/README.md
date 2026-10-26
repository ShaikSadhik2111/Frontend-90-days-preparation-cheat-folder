# Frontend patterns in React

| Pattern | What | Today |
|---|---|---|
| **Container / Presentational** | Container fetches & holds state; presentational renders | Mostly replaced by custom hooks + plain components |
| **Higher-Order Component** | `withAuth(Component)` returns an enhanced component | Legacy; still in libraries (`connect`, `withRouter`). Downsides: wrapper hell, prop collisions |
| **Render props** | `<Mouse render={(pos) => …}/>` | Headless libraries; mostly replaced by hooks |
| **Custom hooks** | Reusable stateful logic | Default way to share logic |
| **Compound components** | `<Tabs><Tabs.Tab/></Tabs>` via context | Flexible component APIs |
| **Controlled / uncontrolled** | Who owns the state | Support both in reusable components |
| **Provider pattern** | Context for DI (theme, auth, API client) | Cross-cutting concerns |
| **State reducer** | Let consumers customise internal transitions | Advanced library pattern |
| **Observer / pub-sub** | Event emitter, stores, WebSocket listeners | Stores built on subscribe + `useSyncExternalStore` |
| **Strangler fig** | Replace a legacy system piece by piece | AngularJS → React migrations |
| **Micro-frontends** | Independently deployed apps composed in a shell | Many teams; Module Federation / single-spa |
| **Optimistic UI** | Update UI before server confirms, rollback on error | `useOptimistic`, query `onMutate` |
| **Feature flags** | Ship code dark, enable per user/env | Safer migrations and releases |

## HOC example (asked to write sometimes)
```tsx
function withPermission<P extends object>(Component: React.ComponentType<P>, permission: Permission) {
  return function Guarded(props: P) {
    const allowed = usePermission(permission);
    return allowed ? <Component {...props} /> : <Forbidden />;
  };
}
const AdminUsers = withPermission(UsersPage, "admin:users");
```

**Interview:** *HOC vs render props vs hooks — which and why?* Hooks for logic reuse (no extra components, easy typing); HOC/render props when you must wrap rendering or work with class components.

Next → [Interview questions](../../17-interview-questions/README.md)
