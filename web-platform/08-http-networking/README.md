# 08 — HTTP and Networking Fundamentals

**Connection:** Frontend applications cross a distributed-system boundary through HTTP and related protocols.

**Learn:** URL, DNS conceptually, TCP/TLS/HTTP relationship, methods, status classes, headers, content negotiation, cookies, authentication concepts, idempotency, HTTP/2 and HTTP/3.

**Production:** REST APIs, authentication, uploads, retries, caching and observability.

**Pitfalls:** retrying unsafe mutations blindly, treating every non-2xx response as a transport failure, exposing credentials, ignoring timeouts, confusing CORS with authorization.

**Interview:** GET/POST/PUT/PATCH? idempotency? 401 vs 403? HTTP/2 vs HTTP/3? cookie role?

**Challenge:** design a paginated search request with timeout, safe retry and error semantics.

**Next:** Fetch.