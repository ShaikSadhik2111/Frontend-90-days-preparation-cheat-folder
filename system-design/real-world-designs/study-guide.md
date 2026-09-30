# Full Case Studies

Use: requirements → scale → architecture → state → APIs → cache → failure → performance → security → accessibility → observability → trade-offs.

## Analytics dashboard
URL owns filters/date range; query cache owns server state; server aggregates expensive analytics; widgets isolate failures; large tables paginate/virtualize; large exports become async jobs.

## E-commerce listing
URL owns search/filter/sort/page; server performs filtering; query cache stores results; images are optimized; pricing remains server-authoritative; optimistic cart updates need rollback.

## Chat
Initial history API + cursor pagination + WebSocket. Optimistic sends use temporary IDs, then reconcile with server IDs. Deduplicate echoed events and reconnect with backoff.

## Notifications
Initial API state + event stream + deduplication by ID + mark-read mutation + cache reconciliation + polling fallback.

## Search
Debounce + cancellation + stale-response guard + cache + server ranking/indexing + permission filtering + keyboard accessibility.

## File processing
Resumable upload + object storage + async worker + progress + validation + status API/events + scoped result access.

Communication template:
“I’ll clarify users, traffic, freshness, data size and failure requirements. Then I’ll separate UI/server state, define the API boundary and optimize around stated bottlenecks. Finally I’ll explain trade-offs and what changes if a requirement changes.”

Practice one case per day for 30 minutes.