# Concurrency
Model overlapping operations explicitly. A later request must not be overwritten by an obsolete response.

Practice: A starts, B starts, B resolves, A resolves. Only B may commit.

Then add AbortController, request IDs, deduplication and unmount cleanup.