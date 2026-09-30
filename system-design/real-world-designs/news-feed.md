# Case Study: News Feed / Infinite Feed

## Requirements
Users scroll a personalized feed, see new items, react and open details.

## Scale assumptions
Millions of daily users, high read volume, variable item size, frequent ranking changes.

## Architecture
Browser → feed API/BFF → ranking/feed service → cache/data stores.

Client uses cursor pagination and virtualized rendering.

## State
URL: filters if applicable.
Server cache: pages/feed items.
UI: scroll position, loading, selected item, optimistic reaction.

## Data flow
Initial cursor request → cache lookup → API → append page → prefetch near sentinel.

## Correctness
Deduplicate items by stable ID. Protect against duplicate page loads. Define behavior when new posts arrive while user is reading.

## Performance
Virtualization, image lazy loading, CDN assets, cursor pagination, request deduplication and prefetching.

## Reliability
Retry transient page loads; preserve already-rendered content when later pages fail.

## Security
Server authorization and tenant/privacy filtering before results reach client.

## Follow-ups
Live inserts, ranking changes, offline mode, moderation and 10× traffic.