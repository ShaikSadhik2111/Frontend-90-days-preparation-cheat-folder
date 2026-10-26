import { useCallback, useEffect, useRef, useState } from "react";
import { fetchUsersPage, User } from "../../api/mockApi";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

/**
 * Cursor-based infinite scroll with IntersectionObserver on a sentinel element.
 * Guards: no duplicate in-flight requests (ref, not state → no stale value),
 * stop when nextCursor is null, error + retry, abort on unmount.
 * Follow-up: virtualize when thousands of rows (react-window / TanStack Virtual).
 */
export function InfiniteList() {
  const [items, setItems] = useState<User[]>([]);
  const [cursor, setCursor] = useState<number | null>(0);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const loadingRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);
  const sentinel = useRef<HTMLLIElement>(null);

  const loadMore = useCallback(async () => {
    if (loadingRef.current || cursor === null) return;
    loadingRef.current = true;
    setStatus("loading");
    abortRef.current = new AbortController();
    try {
      const page = await fetchUsersPage(cursor, 20, abortRef.current.signal);
      setItems((prev) => [...prev, ...page.items]);
      setCursor(page.nextCursor);
      setStatus("idle");
    } catch (e) {
      if ((e as Error).name !== "AbortError") setStatus("error");
    } finally {
      loadingRef.current = false;
    }
  }, [cursor]);

  useEffect(() => () => abortRef.current?.abort(), []);
  useIntersectionObserver(sentinel, loadMore, { enabled: cursor !== null && status !== "error", resetKey: cursor });

  return (
    <div className="infinite">
      <ul aria-label="Users" aria-busy={status === "loading"}>
        {items.map((u) => <li key={u.id}>#{u.id} {u.name} <span className="muted">{u.role}</span></li>)}
        <li ref={sentinel} aria-hidden="true" style={{ height: 1 }} />
      </ul>
      {status === "loading" && <p>Loading more…</p>}
      {status === "error" && <p role="alert">Failed to load. <button onClick={loadMore}>Retry</button></p>}
      {cursor === null && <p className="muted">You've reached the end ({items.length} users).</p>}
      {status === "idle" && cursor !== null && <button onClick={loadMore}>Load more</button>}
    </div>
  );
}
