# Profiling React performance

> Never optimise blindly. **Measure → find the bottleneck → fix → measure again.** Have one real story with numbers for interviews.

## Tools
1. **React DevTools Profiler** — record an interaction; see which components rendered, how long, and **why** ("Props changed: onSelect", "Hook 2 changed"). Enable "Record why each component rendered".
2. **Highlight updates** (DevTools settings) — flashes components as they render.
3. **Chrome Performance panel** — long tasks (>50 ms), scripting vs layout vs paint, flame chart; CPU 4× throttling to mimic slower machines.
4. **Lighthouse / Web Vitals** — LCP, INP, CLS (see [web-vitals](../web-vitals/README.md)).
5. **Bundle analyzer** (`rollup-plugin-visualizer`, `webpack-bundle-analyzer`) — what's in your JS.
6. `<Profiler id onRender>` API or `console.time` for targeted measurements.

## Typical findings & fixes
| Symptom | Likely cause | Fix |
|---|---|---|
| Typing lags | Whole page re-renders per keystroke | Colocate state, `useDeferredValue`/`useTransition`, memo heavy list |
| Long list scroll janky | Thousands of DOM nodes | Virtualization |
| Slow first load | Big bundle | Route code-splitting, remove heavy libs, lazy-load below the fold |
| Many re-renders on store update | Selectors return new objects | Memoized selectors / `useShallow` |
| Chart freezes on data update | Too many points / SVG | Downsample, canvas, throttle updates |
| Memory grows over hours | Listener/subscription leaks | Cleanup in effects; heap snapshots |

## STAR template for your performance story
"Our __ screen took __ s to become interactive / typing lagged __ ms. Profiling showed __. I __ (code-split / virtualized / memoized / moved state). Result: __ → __ (measured with __)."

Next → [Code splitting](../code-splitting/README.md)
