# Data fetching

> Fetching is easy; **correct** fetching handles loading/error/empty states, race conditions, cancellation, caching, retries, deduplication and refetching. That's why production apps use a server-state library.

## Levels of maturity
1. **`useEffect` + fetch** — fine for learning; you must handle races and cleanup yourself (see [useEffect](../03-hooks/useEffect/README.md)).
2. **Custom `useFetch` hook** — reusable, but still no cache/dedupe/retry.
3. **TanStack Query / RTK Query / SWR** — caching, dedupe, background refetch, retries, pagination, optimistic updates.
4. **Framework/router loaders & RSC** — fetch before render on the server or at navigation time, avoid waterfalls.

## Must-know problems
| Problem | Solution |
|---|---|
| Race condition (old response overwrites new) | AbortController in cleanup / ignore flag / query keys |
| Request waterfall (parent fetch → child fetch → …) | Fetch in parallel (`Promise.all`), loaders, prefetch, hoist queries |
| Duplicate requests from many components | Shared cache (query library) dedupes by key |
| `fetch` doesn't reject on 404/500 | Check `res.ok` and throw |
| Flicker of loading on revisit | Cache + stale-while-revalidate |
| Typing API data | Runtime validation (Zod) at the boundary |
| Too many requests while typing | Debounce + min length + cancel |

## A typed API client (good pattern to show)
```ts
export class ApiError extends Error { constructor(public status: number, message: string) { super(message); } }

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
    credentials: "include",                       // send httpOnly session cookie
  });
  if (!res.ok) throw new ApiError(res.status, await res.text());
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}
```

## Interview questions
1. **How do you fetch data in React?** Explain levels above and why you'd use TanStack Query in production.
2. **How do you avoid race conditions?** Cancel or ignore stale responses.
3. **What's a waterfall and how do you fix it?** Sequential dependent fetches; parallelise / prefetch / loaders.

Next → [Server state](server-state/README.md)
