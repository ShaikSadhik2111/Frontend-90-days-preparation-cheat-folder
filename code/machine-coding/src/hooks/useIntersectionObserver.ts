import { RefObject, useEffect, useRef } from "react";

/**
 * Calls `onIntersect` when the target element becomes visible (infinite scroll, lazy load).
 * `resetKey`: change it (e.g. after each page loads) to re-create the observer.
 * Why? IntersectionObserver only fires when visibility CHANGES. If a page of
 * items is too short to push the sentinel out of view, it stays "visible" and
 * never fires again → the list gets stuck. A new observer reports its initial state.
 */
export function useIntersectionObserver<T extends Element>(
  target: RefObject<T>,
  onIntersect: () => void,
  { enabled = true, rootMargin = "200px", resetKey }: { enabled?: boolean; rootMargin?: string; resetKey?: unknown } = {}
) {
  const cb = useRef(onIntersect);
  cb.current = onIntersect;

  useEffect(() => {
    const el = target.current;
    if (!enabled || !el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) cb.current(); },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, enabled, rootMargin, resetKey]);
}
