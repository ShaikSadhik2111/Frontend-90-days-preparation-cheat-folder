import { useEffect, useState } from "react";

type State<T> =
  | { status: "idle" | "loading"; data?: undefined; error?: undefined }
  | { status: "success"; data: T; error?: undefined }
  | { status: "error"; data?: undefined; error: Error };

/**
 * Minimal data-fetching hook showing the 3 things interviewers look for:
 * 1. loading / success / error as a discriminated union (no impossible states)
 * 2. AbortController cleanup → no race conditions, no setState after unmount
 * 3. res.ok check (fetch does NOT reject on 4xx/5xx)
 * In real apps prefer TanStack Query (caching, dedupe, retries, refetch).
 */
export function useFetch<T>(url: string | null): State<T> {
  const [state, setState] = useState<State<T>>({ status: "idle" });

  useEffect(() => {
    if (!url) return;
    const controller = new AbortController();
    setState({ status: "loading" });
    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((data) => setState({ status: "success", data }))
      .catch((error: Error) => {
        if (error.name !== "AbortError") setState({ status: "error", error });
      });
    return () => controller.abort();
  }, [url]);

  return state;
}
