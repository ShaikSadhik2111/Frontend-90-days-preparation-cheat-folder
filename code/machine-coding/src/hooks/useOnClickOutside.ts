import { RefObject, useEffect, useRef } from "react";

/** Calls `handler` when a pointerdown happens outside `ref` (dropdowns, popovers). */
export function useOnClickOutside<T extends HTMLElement>(ref: RefObject<T>, handler: (e: Event) => void) {
  // keep the latest handler without re-subscribing on every render
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (e: Event) => {
      const el = ref.current;
      if (!el || el.contains(e.target as Node)) return;
      handlerRef.current(e);
    };
    document.addEventListener("pointerdown", listener);
    return () => document.removeEventListener("pointerdown", listener);
  }, [ref]);
}
