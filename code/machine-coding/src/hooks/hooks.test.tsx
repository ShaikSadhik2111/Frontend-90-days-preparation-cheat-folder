import { act, renderHook } from "@testing-library/react";
import { useDebounce } from "./useDebounce";
import { usePrevious } from "./usePrevious";
import { useLocalStorage } from "./useLocalStorage";

test("useDebounce updates only after the delay", () => {
  vi.useFakeTimers();
  const { result, rerender } = renderHook(({ v }) => useDebounce(v, 200), { initialProps: { v: "a" } });
  rerender({ v: "ab" });
  rerender({ v: "abc" });
  expect(result.current).toBe("a");
  act(() => { vi.advanceTimersByTime(200); });
  expect(result.current).toBe("abc");
  vi.useRealTimers();
});

test("usePrevious", () => {
  const { result, rerender } = renderHook(({ v }) => usePrevious(v), { initialProps: { v: 1 } });
  expect(result.current).toBeUndefined();
  rerender({ v: 2 });
  expect(result.current).toBe(1);
});

test("useLocalStorage persists", () => {
  localStorage.clear();
  const { result } = renderHook(() => useLocalStorage("k", 0));
  act(() => result.current[1](5));
  expect(localStorage.getItem("k")).toBe("5");
  const { result: again } = renderHook(() => useLocalStorage("k", 0));
  expect(again.current[0]).toBe(5);
});
