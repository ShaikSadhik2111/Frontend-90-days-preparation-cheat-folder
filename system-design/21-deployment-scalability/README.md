# 21 — Deployment & scalability

## Delivery pipeline
PR → install (`npm ci`, cached) → lint → type-check → unit/component tests → build → E2E (Playwright) → preview deployment per PR → merge → deploy to staging → smoke tests → production (canary / progressive) → monitor → rollback if needed.

## Hosting static SPAs
Build artifacts (hashed) → object storage / static host → **CDN** in front. `index.html` with `no-cache`; assets `immutable`. SPA fallback (all routes → `index.html`). Containers (Docker + Nginx) when on-prem/Kubernetes — common in enterprises.

## Config & environments
Build once, deploy many: inject runtime config (`/config.json` or env-injected script) instead of rebuilding per environment. Feature flags (LaunchDarkly/Unleash/home-grown) for dark launches and gradual rollouts.

## Scaling the *frontend codebase* (what "scalability" usually means in FE design)
- Monorepo (Nx/Turborepo, pnpm workspaces) with shared packages (UI kit, utils, API types).
- Module boundaries enforced by lint rules; CODEOWNERS.
- Design system for consistency.
- Independent deployability → micro-frontends when many teams need separate release cycles.
- Build performance: Vite/esbuild/SWC, remote caching.

## Scaling for *traffic*
Static assets scale via CDN; SSR needs horizontal scaling/edge rendering + caching of rendered HTML where possible; protect APIs with caching, batching, rate limits.

Next → [22 Micro-frontends](../22-micro-frontends/README.md)
