# 14 — Browser Security

**Connection:** cross-origin boundaries protect users from arbitrary sites controlling each other.

**Learn:** origin, Same-Origin Policy, CORS, XSS, CSRF, CSP, clickjacking, Trusted Types, cookie attributes, iframe sandboxing, postMessage, mixed content and trust boundaries.

**Example**
```js
// Prefer text insertion for untrusted strings:
element.textContent = userInput;
```

**Production:** authentication, user-generated content, embedded applications and payments.

**Pitfalls:** treating CORS as authentication, storing secrets in JS-readable storage, unsafe postMessage, missing CSP and client-only authorization.

**Interview:** CORS vs CSRF? Why SOP? HttpOnly/Secure/SameSite? CSP? safe postMessage?

**Challenge:** threat-model a React app with comments, file uploads and a third-party payment widget.

**Next:** accessibility.