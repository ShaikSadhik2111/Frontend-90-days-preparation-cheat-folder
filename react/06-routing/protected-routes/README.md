# Protected routes

> Protect pages in the UI by checking authentication/permissions before rendering, and redirect when not allowed. **This is UX only — the server must enforce access on every API call.**

```tsx
function RequireAuth({ children, permission }: { children: React.ReactNode; permission?: Permission }) {
  const { user, status } = useAuth();
  const location = useLocation();

  if (status === "loading") return <FullPageSpinner />;          // avoid flashing the login page
  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;
  if (permission && !user.permissions.includes(permission)) return <Forbidden />;
  return <>{children}</>;
}

// routes
{ path: "admin", element: <RequireAuth permission="admin:read"><AdminPage /></RequireAuth> }

// after login, go back where the user came from
const from = (location.state as { from?: Location })?.from?.pathname ?? "/";
navigate(from, { replace: true });
```
With data routers, you can also check auth in a **loader** and `throw redirect("/login")` — this prevents the protected route's data from even being fetched.

## Things to mention
- Handle the **loading** state of the session check (refresh with a valid cookie shouldn't bounce to /login).
- `replace` so the back button doesn't return to the redirect.
- Hide links/buttons the user can't use, but still enforce on the server.
- Don't ship secrets or admin-only data in the bundle — anything in JS is readable.

**Interview:** *Is a protected route secure?* No — it's navigation UX. Security = server-side authorization of every request.

Next → [Data fetching](../../07-data-fetching/README.md)
