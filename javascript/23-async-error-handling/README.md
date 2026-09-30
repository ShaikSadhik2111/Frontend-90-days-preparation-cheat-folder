# 23 — Async Error Handling

Async failures include network errors, HTTP failures, timeouts, cancellation, parsing errors, validation failures and stale responses.

## Normalize transport failures
    async function loadProfile() {
      const response = await fetch("/api/profile");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    }

## Preserve causes
    try {
      await loadProfile();
    } catch (error) {
      throw new Error("Profile loading failed", { cause: error });
    }

## Retry
Retry only failures that are plausibly transient. Production retry logic should normally use backoff and jitter.

## Stale search responses
An older request can finish after a newer request.
    let requestId = 0;
    async function search(query) {
      const id = ++requestId;
      const result = await fetchResults(query);
      if (id !== requestId) return;
      render(result);
    }

AbortController is another solution.

## UI state
    idle → loading → success
                  ↘ error

Do not catch and ignore errors merely to silence them.

**Next:** general error handling covers synchronous exceptions.