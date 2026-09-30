# Machine Coding Performance
Measure before optimizing. Risks include huge DOMs, expensive filtering, unnecessary rerenders, waterfalls and duplicate requests.

Tools: debounce, profiled memoization, virtualization, pagination, caching and workers for CPU-heavy work.

Challenge: optimize a 100k-row table without changing behavior.