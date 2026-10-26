# React Server Components (RSC)

> **Server Components** run only on the server (at build or request time). They can read databases/files directly and **send zero JavaScript** to the browser. **Client Components** (`"use client"`) are the interactive parts that hydrate in the browser.

```tsx
// app/devices/page.tsx — Server Component (default in Next.js App Router)
import { db } from "@/lib/db";
import { DeviceFilter } from "./DeviceFilter";

export default async function DevicesPage() {
  const devices = await db.device.findMany();          // runs on server, no API layer needed
  return (
    <main>
      <h1>Devices</h1>
      <DeviceFilter devices={devices} />               {/* client component receives serialisable props */}
    </main>
  );
}

// app/devices/DeviceFilter.tsx
"use client";
export function DeviceFilter({ devices }: { devices: Device[] }) {
  const [q, setQ] = useState("");                      // hooks/events only in client components
  return <>{/* ... */}</>;
}
```

## Rules
| Server Component | Client Component |
|---|---|
| Can be `async`, access DB/secrets/files | Can use state, effects, event handlers, browser APIs |
| No hooks like `useState`/`useEffect`, no event handlers | Shipped as JS and hydrated |
| Can import client components | Cannot import server components (but can receive them as `children`) |
- Props passed from server → client must be **serialisable** (no functions except Server Functions, no class instances).
- `"use client"` marks a **boundary**: that file and everything it imports become client code.
- **Server Functions** (`"use server"`) — functions the client can call (e.g. form actions); they run on the server. Always validate input and check auth inside them.

## RSC vs SSR
SSR renders **client components** to HTML for the first load and then hydrates all of them. RSC components **never hydrate** and can refetch/re-render on the server during navigation. They're complementary (Next.js uses both).

## Interview questions
1. **What are Server Components?** Components rendered on the server only, no client JS, direct data access.
2. **How do they differ from SSR?** SSR = HTML for initial load + hydrate everything; RSC = server-only component tree, no hydration for those parts.
3. **When would you use `"use client"`?** Interactivity, state, effects, browser APIs — push it as deep (leafy) as possible.

Next → [Architecture](../../16-architecture/component-architecture/README.md)
