# 04 — Frontend architecture & rendering strategy

## Rendering strategies
| Strategy | How | Best for | Cost |
|---|---|---|---|
| **CSR** (SPA) | Empty HTML + JS renders in browser | Apps behind login, dashboards | Slower first load, SEO weak |
| **SSR** | HTML per request on server, then hydrate | Personalised public pages, fast LCP | Server cost, hydration JS |
| **SSG** | HTML at build time | Docs, marketing, blogs | Rebuild to update |
| **ISR** | SSG + periodic/on-demand revalidation | Large catalogs | Framework-specific |
| **Streaming SSR + RSC** | Server components, stream per Suspense boundary | Content + interactivity mix | Newer, framework (Next.js) |
| **Islands** | Mostly static HTML + small interactive islands | Content sites (Astro) | Less suited to app-like UIs |

## Client architecture layers
```
UI components (design system)  ←  Feature modules (pages, flows)
            ↑                              ↑
     State: local / store / URL     Server-state cache (TanStack Query)
                                           ↑
                                 API client (auth, retries, errors, types)
                                           ↑
                     REST/GraphQL · WebSocket/SSE · Service Worker (offline)
```
Cross-cutting: routing, auth, i18n, feature flags, error boundaries, logging/monitoring, analytics.

## Draw this in the interview
Boxes for: **Router/Shell**, **Feature A/B**, **Shared UI kit**, **Store**, **Query cache**, **API client**, **Realtime client**, **Server/BFF**, **CDN**. Arrows for data flow. Mark where caching and error handling live.

## BFF (Backend for Frontend)
A thin server layer per client that aggregates/shapes backend APIs for the UI → fewer round trips, hides internal services, handles auth tokens server-side. Mention it when backends are many or chatty.

## Interview questions
1. CSR vs SSR vs SSG — choose for an internal IoT dashboard vs a public product catalog.
2. Where do you put API error handling and retries?
3. What is a BFF and why use one?

Next → [05 Component architecture](../05-component-architecture/README.md)
