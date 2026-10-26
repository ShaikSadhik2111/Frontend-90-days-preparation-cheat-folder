# Events

> React event handlers are functions passed as props like `onClick`. React wraps native events in a **SyntheticEvent** with the same interface across browsers.

## Basics
```tsx
function Form() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();               // stop the browser's page reload
    // submit...
  }
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} />
      <button onClick={() => track("save")}>Save</button>  {/* pass a function */}
    </form>
  );
}
```
- Pass the function, don't call it: `onClick={save}` ✅, `onClick={save()}` ❌ (runs during render).
- Passing arguments: `onClick={() => remove(item.id)}`.
- `e.stopPropagation()` stops bubbling; `e.preventDefault()` cancels the default action — different things.
- `onChange` in React fires on **every keystroke** for inputs (like native `input` event), not on blur.

## How React attaches events
- React does **event delegation**: one listener per event type on the **root container** (since React 17; before that on `document`). When a native event bubbles to the root, React walks its fiber tree and calls your handlers.
- Events bubble through the **React tree**, not the DOM tree — so an event inside a **portal** bubbles to its React parent even though the DOM node is elsewhere.
- Capture phase handlers: `onClickCapture`.
- React 17 removed event pooling, so reading `e.target` asynchronously is fine now.

## Events vs Effects (important design rule)
- Code that runs **because the user did something** → event handler (submit form, send analytics on click).
- Code that runs **because the component is displayed / some value changed** → Effect (subscribe, sync with external system).
```tsx
// ❌ effect chain reacting to state set by an event
useEffect(() => { if (submitted) post(form); }, [submitted]);
// ✅ do it in the handler
function handleSubmit() { post(form); }
```

## Native listeners in React
For window/document events or third-party DOM, add them in an Effect and **clean up**:
```tsx
useEffect(() => {
  const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, [close]);
```

## Typing events (TS)
`React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement | HTMLSelectElement>`, `React.KeyboardEvent<HTMLInputElement>`, `React.FormEvent<HTMLFormElement>`.

## Common bugs → fixes
| Bug | Fix |
|---|---|
| `onClick={handle()}` runs on render / infinite loop | `onClick={handle}` or `onClick={() => handle(id)}` |
| Form reloads page | `e.preventDefault()` in `onSubmit` |
| Listener leak on window | Remove it in effect cleanup |
| Stale state inside a long-lived listener | Updater function or a ref holding the latest value |

## Interview questions
1. **What is a SyntheticEvent?** A cross-browser wrapper over the native event; `e.nativeEvent` gives the original.
2. **Where does React attach listeners?** At the root container (delegation), since React 17.
3. **Do portal events bubble to React parents?** Yes, through the React tree.
4. **`stopPropagation` vs `preventDefault`?** Stop bubbling vs cancel default browser behaviour.
5. **Event handler or Effect?** Caused by a specific interaction → handler; caused by rendering/sync → Effect.

## Practice
Build a dropdown that closes on outside click and Escape. Use one document listener with cleanup, and make sure clicks inside the menu don't close it.

Next → [Children and composition](../children-and-composition/README.md)
