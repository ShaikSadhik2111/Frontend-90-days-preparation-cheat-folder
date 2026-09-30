# Frontend Performance

Pipeline: navigation → network → HTML/JS/CSS → data → parse/compile → render → interaction. Measure the bottleneck first.

Network: eliminate waterfalls, reduce critical requests, cache immutable assets, compress and use suitable edge delivery.

JavaScript: code splitting, lazy loading, dependency discipline, deferred non-critical work.

Rendering: avoid unnecessary rerenders, profile before memoizing, virtualize large lists.

Assets: responsive images, suitable formats, dimensions and deliberate font loading.

Data: pagination, caching, deduplication and justified prefetch.

Web Vitals: LCP for loading, INP for interaction responsiveness, CLS for visual stability. Connect metrics to user journeys.

Large table approach: measure → server filter/page where possible → virtualize → profile expensive subtrees → move CPU-heavy transformation to a worker when justified.

Trade-off: virtualization reduces DOM work but complicates measurement and accessibility.

Challenge: profile a dashboard and document three bottlenecks, evidence, metric and fix.