import { useEffect, useRef } from "react";

/** Value from the previous render (undefined on first render). */
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value; // runs after render → during render ref still holds the old value
  }, [value]);
  return ref.current;
}
