# Web Platform — Connected Frontend Engineering Learning Path

This section teaches the browser as a runtime and platform, not as a collection of API names.

## Learning progression
01 Fundamentals → 02 HTML/Semantics → 03 CSS/Layout → 04 DOM/CSSOM → 05 Events → 06 Rendering → 07 Storage → 08 HTTP → 09 Fetch → 10 Caching → 11 Workers → 12 Service Workers/PWA → 13 WebSockets/SSE → 14 Security → 15 Accessibility → 16 Performance → 17 DevTools → 18 Web Components → 19 Modern Browser APIs → 20 Interview Drills.

## Core chain
HTML/CSS → DOM/CSSOM → events → rendering → networking → storage/cache → background execution → real-time → security → accessibility → performance → debugging → reusable platform components → interview reasoning.

## Study contract
Every stage must answer: what, why, runtime behavior, working example, production use, failure modes, debugging, security/accessibility/performance implications, scale, and interview follow-ups.

For fast-changing APIs, learn the durable browser concept first and verify version-specific behavior against current MDN/browser compatibility data.

## Framework connection
React render → DOM commit → browser rendering.
React events → browser events.
fetch → HTTP → caching → server state.
local persistence → Web Storage/IndexedDB.
CPU-heavy work → Worker.
offline UI → Service Worker + IndexedDB.
real-time UI → WebSocket/SSE.
accessible component → semantic HTML + keyboard + ARIA.
slow UI → Performance API + DevTools.

## Completion standard
A stage is complete only when you can implement its challenge, explain its runtime model, debug a failure, and answer three interview follow-ups.

Official references: https://developer.mozilla.org/en-US/docs/Web/API | https://developer.mozilla.org/en-US/docs/Learn_web_development | https://web.dev/