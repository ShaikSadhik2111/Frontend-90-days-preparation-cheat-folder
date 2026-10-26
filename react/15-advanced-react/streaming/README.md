# Streaming SSR

> Instead of waiting for **all** data before sending HTML, the server **streams** the page: the shell first, then each `<Suspense>` boundary's HTML as its data resolves.

```
Request → server sends <html><Header/><Nav/> + <ChartSkeleton/> immediately
        → data for chart ready → server streams chart HTML + small inline script that swaps it in
        → JS loads → selective hydration
```
APIs: `renderToPipeableStream` (Node), `renderToReadableStream` (Web streams/edge). Frameworks (Next.js App Router, Remix/React Router) do this for you.

## Benefits
- Faster **TTFB/FCP** — the user sees layout immediately.
- Slow data sources don't block the whole page.
- Works with selective hydration — interactive parts hydrate as they arrive.

## Things to consider
- Status codes/headers must be decided before streaming starts (redirects/404 early).
- Put slow, non-critical parts inside Suspense boundaries; keep SEO-critical content in the shell.
- Proxies/CDNs must not buffer the response.

**Interview:** *SSR vs streaming SSR?* Classic SSR waits for all data then sends HTML; streaming sends progressively per Suspense boundary.

Next → [Server Components](../server-components/README.md)
