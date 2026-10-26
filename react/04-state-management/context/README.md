# Context as state management

> Context + `useReducer` can act as a lightweight store for **low-frequency, app-wide** state. Know its re-render cost.

```tsx
type Settings = { unit: "metric" | "imperial"; language: "en" | "de" };
type Action = { type: "setUnit"; unit: Settings["unit"] } | { type: "setLanguage"; language: Settings["language"] };

const SettingsState = createContext<Settings | null>(null);
const SettingsDispatch = createContext<React.Dispatch<Action> | null>(null);

function reducer(s: Settings, a: Action): Settings {
  switch (a.type) {
    case "setUnit": return { ...s, unit: a.unit };
    case "setLanguage": return { ...s, language: a.language };
  }
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { unit: "metric", language: "en" });
  return (
    <SettingsDispatch.Provider value={dispatch}>         {/* dispatch never changes */}
      <SettingsState.Provider value={state}>{children}</SettingsState.Provider>
    </SettingsDispatch.Provider>
  );
}
export const useSettings = () => { const c = useContext(SettingsState); if (!c) throw new Error("No SettingsProvider"); return c; };
export const useSettingsDispatch = () => { const c = useContext(SettingsDispatch); if (!c) throw new Error("No SettingsProvider"); return c; };
```
Components that only dispatch (buttons) read `SettingsDispatch` → they **don't re-render** when settings change.

## Limits of context
- No selectors: a consumer re-renders on *any* change to the value, even fields it doesn't use.
- Frequent updates (telemetry, typing) across a big tree → slow. Use a store with selectors.
- Provider nesting ("provider hell") for many domains.

## Interview questions
1. **Is Context a state management tool?** It's a way to pass values; combined with useState/useReducer it can manage state for small cases.
2. **How do you prevent unnecessary consumer re-renders?** Memoize value, split state/dispatch, split by domain, or switch to a selector-based store.

Next → [Redux Toolkit](../redux/README.md)
