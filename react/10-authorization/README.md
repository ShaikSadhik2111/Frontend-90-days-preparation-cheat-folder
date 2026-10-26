# Authorization in the UI

> Authorization = **what are you allowed to do?** The UI should **reflect** permissions (hide/disable), but the **server must enforce** them on every request.

## Permission-based (not role-string) checks
```tsx
type Permission = "device:read" | "device:write" | "alarm:ack" | "admin:users";

function usePermission(p: Permission) {
  const { user } = useAuth();
  return !!user?.permissions.includes(p);
}

function Can({ permission, children, fallback = null }: { permission: Permission; children: React.ReactNode; fallback?: React.ReactNode }) {
  return usePermission(permission) ? <>{children}</> : <>{fallback}</>;
}

<Can permission="alarm:ack"><button onClick={ack}>Acknowledge</button></Can>
```
- Check **permissions**, not `role === "admin"` everywhere — roles map to permissions on the server, so new roles don't need UI changes.
- **RBAC** (role-based) vs **ABAC** (attribute-based: "can edit devices in *their own* plant") — ABAC needs resource context: `can("device:write", device)`.
- Route-level guard → page; component-level → buttons/fields; API → final authority (403 handling in UI).
- Disabled vs hidden: hide what the user should never know about; disable with a tooltip when it explains *why* ("Requires supervisor role").

## Interview questions
1. **Is hiding a button enough?** No — the API must reject unauthorised requests.
2. **How do you structure permissions in a large app?** Server sends a permission list/claims; UI uses a `can()` helper and `<Can>` component; route guards; handle 403.

Next → [Performance](../11-performance/memoization/README.md)
