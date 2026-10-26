import { useEffect, useState } from "react";

/** useState that persists to localStorage (safe if storage is unavailable). */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw !== null ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* quota exceeded / private mode — ignore */
    }
  }, [key, value]);

  return [value, setValue] as const;
}
