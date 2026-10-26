# 17 — Security (design view)

## Checklist to mention
| Threat | Frontend measures |
|---|---|
| XSS | Framework escaping, no raw HTML (or DOMPurify), CSP with nonces, Trusted Types, sanitise rich text, avoid `javascript:` URLs |
| Session theft | httpOnly + Secure + SameSite cookies; short-lived tokens; refresh rotation; logout invalidation |
| CSRF | SameSite cookies, CSRF tokens, Origin checks, no state change via GET |
| Clickjacking | `frame-ancestors 'none'` |
| Broken access control | Server-side authorization on **every** endpoint; UI only reflects permissions; handle 403 |
| Sensitive data exposure | No secrets in bundles; minimal PII in client storage; clear on logout; mask in logs/analytics |
| Supply chain | Lockfiles, audits, Dependabot/Renovate, SRI for third-party scripts, limit third-party tags |
| Injection via uploads | Validate type/size client-side for UX, scan server-side, serve from separate domain |
| Open redirect | Allow-list post-login redirects |
| postMessage abuse | Check `origin`, specify `targetOrigin` |
| Abuse/DoS | Rate limits (server), debounce/backoff (client), CAPTCHA where needed |

## Auth architecture
SSO via OIDC (Authorization Code + PKCE) for enterprise; BFF pattern can keep tokens server-side and give the browser only an httpOnly session cookie (strong option for high-security apps).

## Industrial/OT angle
For apps that send **commands to machines**: confirmation steps, role checks, audit logs, no optimistic UI for commands, idempotency, clear feedback of actual machine state.

Details: [web-platform/14-browser-security](../../web-platform/14-browser-security/README.md).

Next → [18 Accessibility](../18-accessibility/README.md)
