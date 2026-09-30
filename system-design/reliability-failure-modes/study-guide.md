# Reliability and Failure Modes

For every dependency ask: can it timeout, return stale data, partially fail, duplicate a mutation, survive navigation, work offline or expire authentication?

Failure categories: network, application, client runtime and third-party dependency.

Recovery patterns: timeout, bounded retry, backoff, cancellation, fallback, stale-data refresh, optimistic rollback and error boundaries.

Do not retry everything. A validation error is different from a transient server failure.

React error boundaries handle render/lifecycle errors in their subtree; async event/data failures still need explicit handling.

Reliability matrix: failure → detection → user experience → recovery → telemetry.

Challenge: design a dashboard where one failed widget does not hide healthy widgets.