# 12 — API integration

```ts
// api.ts — one place for base URL, headers, errors, typing
export class HttpError extends Error { constructor(public status: number, msg: string) { super(msg); } }

export async function http<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api${path}`, { ...init, headers: { "Content-Type": "application/json", ...init.headers } });
  if (!res.ok) throw new HttpError(res.status, (await res.text()) || res.statusText);
  return res.status === 204 ? (undefined as T) : res.json();
}
export const usersApi = {
  list: (page: number, signal?: AbortSignal) => http<Page<User>>(`/users?page=${page}`, { signal }),
  update: (id: string, patch: Partial<User>) => http<User>(`/users/${id}`, { method: "PATCH", body: JSON.stringify(patch) }),
};
```
Checklist: `res.ok` check · typed responses · `encodeURIComponent` for query params · AbortSignal · consistent error messages · loading/error UI · retry for GET · no secrets in code. Public practice APIs: `jsonplaceholder.typicode.com`, `dummyjson.com` (or your own mock with latency).

Next → [13 Pagination](../13-pagination/README.md)
