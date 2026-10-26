# TanStack Query (React Query)

> A server-state library: `useQuery` for reads, `useMutation` for writes, a shared `QueryClient` cache keyed by **query keys**.

## Setup
```tsx
const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 2 } } });
<QueryClientProvider client={queryClient}><App /></QueryClientProvider>
```

## Reading
```tsx
function DeviceList({ plantId }: { plantId: string }) {
  const { data, isPending, isError, error, isFetching, refetch } = useQuery({
    queryKey: ["devices", plantId],                       // cache identity — include every variable
    queryFn: ({ signal }) => api<Device[]>(`/plants/${plantId}/devices`, { signal }), // auto-cancel
    enabled: !!plantId,                                   // dependent query
  });
  if (isPending) return <Skeleton />;
  if (isError) return <ErrorState message={error.message} onRetry={refetch} />;
  if (data.length === 0) return <EmptyState />;
  return <>{isFetching && <small>Refreshing…</small>}<Table rows={data} /></>;
}
```
- `isPending` = no data yet; `isFetching` = any request in flight (including background refetch).
- **`staleTime`** (default 0): how long data counts as fresh → no refetch. **`gcTime`** (v5; `cacheTime` in v4, default 5 min): how long *unused* data stays in cache.
- Same key in 10 components → **one** request (dedupe).
- Pagination: put `page` in the key + `placeholderData: keepPreviousData` (v5) to avoid flashing. Infinite lists: `useInfiniteQuery` with `getNextPageParam`.
- Polling: `refetchInterval: 5000`.

## Writing with optimistic update + rollback
```tsx
const qc = useQueryClient();
const rename = useMutation({
  mutationFn: (d: { id: string; name: string }) => api(`/devices/${d.id}`, { method: "PATCH", body: JSON.stringify(d) }),
  onMutate: async (d) => {
    await qc.cancelQueries({ queryKey: ["devices", plantId] });
    const previous = qc.getQueryData<Device[]>(["devices", plantId]);
    qc.setQueryData<Device[]>(["devices", plantId], (old = []) => old.map((x) => (x.id === d.id ? { ...x, name: d.name } : x)));
    return { previous };
  },
  onError: (_e, _d, ctx) => qc.setQueryData(["devices", plantId], ctx?.previous),   // rollback
  onSettled: () => qc.invalidateQueries({ queryKey: ["devices", plantId] }),          // resync with server
});
rename.mutate({ id, name });
```

## Interview questions
1. **staleTime vs gcTime?** Freshness window vs cache lifetime for unused data.
2. **How does dedupe work?** Same query key shares one in-flight promise and cache entry.
3. **How do you update lists after a mutation?** `invalidateQueries`, or `setQueryData` for instant updates.
4. **Optimistic update steps?** cancel → snapshot → set → rollback on error → invalidate on settle.

Next → [Caching & invalidation](../caching-invalidation/README.md)
