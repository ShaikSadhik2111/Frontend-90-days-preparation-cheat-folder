# Hydration

> With SSR, the server sends ready HTML; **hydration** is React on the client attaching event listeners and state to that existing HTML (`hydrateRoot`) instead of re-creating the DOM.

```tsx
import { hydrateRoot } from "react-dom/client";
hydrateRoot(document.getElementById("root")!, <App />);
```

## Hydration mismatch
The first client render **must produce the same HTML** as the server. Common causes:
| Cause | Fix |
|---|---|
| `Date.now()`, `new Date().toLocaleString()`, time zones | Render on client after mount, or pass the server time as data |
| `Math.random()` / random ids | `useId` |
| `typeof window !== "undefined"` branches during render | Render a stable placeholder, switch in `useEffect` |
| Reading `localStorage` / theme during render | Read in an effect, or use a cookie the server can read |
| Invalid HTML nesting (`<div>` inside `<p>`, `<a>` in `<a>`) | Fix markup — browser rewrites it |
| Browser extensions changing DOM | Usually benign; `suppressHydrationWarning` only for unavoidable single nodes (e.g. timestamps) |

Client-only value pattern:
```tsx
function useIsClient() { const [c, setC] = useState(false); useEffect(() => setC(true), []); return c; }
const isClient = useIsClient();
return <span>{isClient ? new Date().toLocaleTimeString() : "--:--"}</span>;
```

## Performance angle
- HTML is visible early (good LCP) but **not interactive until hydration** finishes → large JS hurts INP/TTI.
- **Selective hydration** (React 18): with Suspense boundaries, parts hydrate independently, and React prioritises the part the user clicks.
- RSC reduces hydration cost: server-only components ship no JS.

**Interview:** *What is a hydration mismatch and how do you debug it?* Server vs client output differs; read React's diff in the console, look for time/random/browser-only values, fix by making the first render deterministic.

Next → [Streaming](../streaming/README.md)
