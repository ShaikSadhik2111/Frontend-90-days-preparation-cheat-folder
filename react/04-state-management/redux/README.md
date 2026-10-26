# Redux (Redux Toolkit)

> Redux is a **predictable global store**: state lives in one place, changes only by dispatching **actions** handled by pure **reducers**. Modern Redux = **Redux Toolkit (RTK)**.

## Data flow
```
UI ── dispatch(action) ──► middleware (thunks, logging) ──► reducer(state, action) ──► new state
 ▲                                                                                    │
 └──────────── useSelector re-renders only components whose selected value changed ◄──┘
```

## RTK essentials
```ts
// features/devices/devicesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export const fetchDevices = createAsyncThunk("devices/fetch", async (plantId: string) => {
  const res = await fetch(`/api/plants/${plantId}/devices`);
  if (!res.ok) throw new Error("Failed");
  return (await res.json()) as Device[];
});

const devicesSlice = createSlice({
  name: "devices",
  initialState: { items: [] as Device[], status: "idle" as "idle" | "loading" | "failed", selectedId: null as string | null },
  reducers: {
    selectDevice(state, action: PayloadAction<string>) { state.selectedId = action.payload; }, // Immer: "mutate" draft safely
  },
  extraReducers: (b) => {
    b.addCase(fetchDevices.pending, (s) => { s.status = "loading"; })
     .addCase(fetchDevices.fulfilled, (s, a) => { s.status = "idle"; s.items = a.payload; })
     .addCase(fetchDevices.rejected, (s) => { s.status = "failed"; });
  },
});
export const { selectDevice } = devicesSlice.actions;
export default devicesSlice.reducer;

// app/store.ts
export const store = configureStore({ reducer: { devices: devicesReducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// usage
const devices = useSelector((s: RootState) => s.devices.items);
const dispatch = useDispatch<AppDispatch>();
dispatch(fetchDevices("plant-1"));
```

## Performance with selectors
- `useSelector` re-renders when the selected value changes by **reference**. Returning a new array/object every time (`s.items.filter(...)`) → re-render on every store update.
- Use memoized selectors: `createSelector([selectItems, selectQuery], (items, q) => items.filter(...))`.
- Select the smallest piece you need.
- Normalise collections with `createEntityAdapter` (`ids` + `entities`).

## RTK Query
Data-fetching + caching layer built into RTK (like TanStack Query): `createApi`, auto-generated hooks (`useGetDevicesQuery`), cache tags for invalidation. Use it instead of hand-written thunks for server data.

## When Redux, when not
✅ Large app, many teams, complex shared client state, need devtools/time-travel, middleware, strict patterns.
❌ Mostly server data (use a query library), small apps (useState/context/Zustand).

## Interview questions
1. **Explain Redux flow.** Action → reducer → new state → subscribed components re-render via selectors.
2. **Why must reducers be pure/immutable?** Predictability, reference-based change detection, time-travel.
3. **How does RTK let you "mutate" state?** Immer records changes on a draft and produces a new immutable state.
4. **What are middleware/thunks?** Functions between dispatch and reducer for side effects (async, logging).
5. **Redux vs Context?** Selectors + devtools + middleware vs simple DI without selectors.

## Practice
Build a devices slice with `createAsyncThunk`, a memoized selector for filtered devices, and show with the Profiler that a component selecting `selectedId` doesn't re-render when `items` change.

Next → [Zustand](../zustand/README.md)
