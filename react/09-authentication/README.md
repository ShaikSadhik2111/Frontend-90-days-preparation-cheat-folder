# Authentication in a React SPA

> Authentication = **who are you?** In SPAs the questions are: where do tokens live, how do you refresh them, and how does the UI know the session state?

## Token storage — the classic interview question
| Option | XSS risk | CSRF risk | Notes |
|---|---|---|---|
| **httpOnly + Secure + SameSite cookie** (recommended) | JS can't read it ✅ | Mitigated by `SameSite=Lax/Strict` + CSRF token | Server sets it; `fetch(..., { credentials: "include" })` |
| `localStorage` / `sessionStorage` | Any injected script can steal it ❌ | None | Simple, but a single XSS = account takeover |
| In-memory (JS variable) | Lost on refresh; still readable by XSS while running | None | Often combined with a refresh-token cookie |

Common setup: **short-lived access token** (5–15 min) + **refresh token in httpOnly cookie** with rotation. Enterprise apps (Bosch/Siemens style) often use **OIDC/OAuth 2.0 with PKCE** via an identity provider (Azure AD/Entra ID, Keycloak, Okta) using libraries like MSAL or oidc-client.

## Session state in React
```tsx
type AuthState = { status: "loading" } | { status: "anonymous" } | { status: "authenticated"; user: User };

function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isPending } = useQuery({ queryKey: ["me"], queryFn: () => api<User>("/me"), retry: false });
  const state: AuthState = isPending ? { status: "loading" } : data ? { status: "authenticated", user: data } : { status: "anonymous" };
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}
```

## Refresh on 401 (interceptor idea)
1. Request returns 401 → call `/auth/refresh` **once** (share one in-flight refresh promise across concurrent failing requests).
2. Retry the original requests.
3. If refresh fails → clear cache, redirect to login.

## Logout
Call the server to invalidate the session/refresh token, clear query cache and stores (`queryClient.clear()`), broadcast to other tabs (`BroadcastChannel` / `storage` event).

## Interview questions
1. **Where would you store a JWT?** Prefer httpOnly cookie; explain trade-offs.
2. **How do you handle token expiry?** Refresh flow with single-flight refresh and retry.
3. **What is OAuth/OIDC + PKCE?** Delegated login via an identity provider; PKCE protects the code exchange in public clients (SPAs).
4. **How do you keep tabs in sync on logout?** BroadcastChannel/storage events.

Next → [Authorization](../10-authorization/README.md)
