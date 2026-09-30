# 38 — Browser Platform Depth

This extension connects JavaScript language knowledge to the browser runtime.

## Topics

1. DOM and browser APIs
2. Fetch / Request / Response
3. HTTP fundamentals for frontend engineers
4. Web Storage
5. IndexedDB
6. Web Workers
7. Service Workers
8. WebSockets
9. Server-Sent Events
10. Browser security: Same-Origin Policy, CORS, XSS, CSRF, CSP, Trusted Types

## Learning chain

`JavaScript runtime → browser event system → DOM → network boundary → storage → background execution → real-time transport → security boundary`

## Required depth

For each topic cover the API model, runtime behavior, production frontend use, failure modes, debugging workflow, security/performance implications and an interview exercise.

Do not treat browser APIs as memorized methods. Explain how they interact with the event loop, HTTP, React/Angular lifecycle and application state.

## Interview scenarios

- Why can a CPU-heavy DOM operation freeze the UI?
- Why does a CORS failure differ from a server returning HTTP 403?
- When should data live in IndexedDB rather than localStorage?
- When should WebSocket be preferred over SSE?
- Why does moving work to a Worker improve responsiveness?
- What happens to a Service Worker across deploys?
