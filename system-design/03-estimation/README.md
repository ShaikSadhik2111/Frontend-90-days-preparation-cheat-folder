# 03 — Back-of-the-envelope estimation (frontend flavour)

> Rough numbers justify decisions: pagination size, virtualization, update throttling, payload limits.

## Useful numbers
- 60 fps → **16.7 ms per frame**; long task > **50 ms**; good INP ≤ **200 ms**.
- DOM: thousands of nodes are fine; **tens of thousands** start to hurt layout/memory → virtualize.
- SVG charts slow down beyond ~**5–10k** elements → canvas/WebGL or downsampling.
- JavaScript is the most expensive byte (download + parse + compile + execute, worst on low-end CPUs) → a common budget is **≤ ~150–200 KB gzip** JS for the initial route.
- Mobile 4G RTT ~**50–100 ms**; each extra sequential request adds an RTT.
- localStorage ~**5 MB**; cookies ~**4 KB**.

## Example estimates
**Live dashboard**: 2,000 devices × 1 update/s = 2,000 msgs/s → too many to render one by one → batch per animation frame / 500 ms, subscribe only to visible devices (say 50) → ~50 msgs/s.
**Data grid**: 100k rows × 10 columns = 1M cells → never render all; virtualize rows+columns (~40 rows × 10 cols visible = 400 cells); server-side sort/filter.
**Payload**: 100k rows × ~200 bytes = 20 MB JSON → paginate (100 rows/page = 20 KB) or stream; compress.
**Chart history**: 7 days at 1 point/s = 604,800 points per series → server downsampling (min/max per pixel bucket, ~1–2k points).

## Interview phrasing
"Roughly N × M = X, which is too much for the DOM, so I'll virtualize and paginate server-side."

Next → [04 Frontend architecture](../04-frontend-architecture/README.md)
