# 19 — Reliability & failure modes

> Ask "what happens when this fails?" for every box in your diagram.

## Failure modes → design responses
| Failure | Response |
|---|---|
| API slow | Timeouts, skeletons, keep previous data, cancel stale requests |
| API down / 5xx | Retries with backoff + jitter (idempotent only), circuit-breaker-ish behaviour (stop hammering), cached/stale data with banner, retry button |
| Partial failure (one widget's endpoint fails) | Per-widget error boundary + independent loading; page still usable |
| 401 mid-session | Single-flight token refresh, replay queued requests, else re-login preserving unsaved work |
| Network offline | Detect `online/offline`, queue writes, read from cache, clear status indicator |
| WebSocket drops | Reconnect with backoff, resync snapshot, gap detection via sequence numbers |
| Deploy while users are active | Chunk-load errors → catch in lazy boundaries, prompt reload; backward-compatible APIs; versioned assets |
| Bad release | Feature flags / kill switch, canary rollout, instant rollback (redeploy previous artifact) |
| Third-party script fails | Load async, isolate (sandboxed iframe), timeouts; app works without it |
| Client crash (render error) | Error boundaries at root/route/widget + reporting |
| Data conflicts | Versions/ETags, 409 handling, merge UI |
| Browser storage full/blocked | try/catch, degrade gracefully |

## Principles
Graceful degradation · fail fast with clear messages · never lose user input (autosave drafts) · idempotent operations · observable failures (logged with context).

Next → [20 Observability](../20-observability/README.md)
