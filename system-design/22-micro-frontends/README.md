# 22 — Micro-frontends

> Split a large frontend into **independently developed and deployed** apps owned by different teams, composed into one product.

## Composition approaches
| Approach | How | Notes |
|---|---|---|
| Build-time packages | Each team publishes an npm package; shell imports them | Simple, but coupled releases |
| **Module Federation** (webpack 5 / Rspack / Vite plugin) | Shell loads remote bundles at runtime; shares deps (React as singleton) | Most common today |
| **single-spa** | Framework-agnostic orchestrator mounting apps per route | Great for **mixed frameworks (AngularJS + React)** |
| iframes | Strong isolation | Poor UX integration (routing, sizing, a11y) |
| Web Components | Framework-agnostic widgets | Good for shared widgets/design systems |
| Server-side composition / edge includes | Assemble HTML on server | Content-heavy sites |

## Design concerns
- **Shell responsibilities**: auth, routing, layout/navigation, shared design tokens, error fallback when a remote fails to load.
- **Shared dependencies**: singleton React/router versions; avoid each app shipping its own copy.
- **Communication**: URL, custom events/event bus, shared store with a small contract — keep it minimal.
- **Styling isolation**: CSS Modules/prefixes/shadow DOM; shared tokens.
- **Contracts & versioning**: remote entry versions, backward compatibility, contract tests.
- **Performance**: duplicate code, extra network requests → monitor bundle sizes.
- **Developer experience**: run one MFE standalone with mocks; integration environments.

## When (not) to use
✅ Many teams, independent release cadence, large legacy migration (strangler).
❌ One team / small app — the complexity costs more than it saves. A well-structured monorepo is often enough.

## Migration angle
single-spa / Module Federation let AngularJS and React apps run side by side, route by route — a strong way to present your AngularJS → React experience as architecture. See [migration notes](../../angularjs-to-react-migration/README.md).

Next → [23 Design systems](../23-design-systems/README.md)
