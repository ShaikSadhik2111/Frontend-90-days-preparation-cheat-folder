# Frontend Security

Trust boundary: browser input, query parameters, local storage and API responses are untrusted.

XSS defenses: framework escaping, safe output, sanitization where required, CSP and Trusted Types where appropriate. Avoid unsafe HTML APIs without a threat model.

CSRF matters with ambient credentials such as cookies. Depending on architecture use SameSite cookies, CSRF tokens and origin checks.

CORS controls browser cross-origin reads. It is not authentication and does not protect an API from non-browser clients.

Never ship private API keys in frontend bundles. Define session expiration, refresh and revocation behavior.

Hiding a UI button is not authorization. Server-side authorization is mandatory.

Dependency security: lock versions, monitor advisories, minimize packages, protect CI credentials and review supply-chain changes.

Threat model: asset → attacker → trust boundary → exploit → impact → mitigation → detection.

Challenge: threat-model a file upload including malicious content, oversized payloads, metadata/XSS, CSRF, authorization and unsafe downloads.