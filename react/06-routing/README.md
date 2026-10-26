# Routing (React Router)

> Client-side routing maps URLs to components **without full page reloads** using the History API. React Router (v6/v7) is the standard in non-framework apps.

## Data router setup (v6.4+ / v7)
```tsx
import { createBrowserRouter, RouterProvider, Outlet, Link, NavLink, useParams, useSearchParams } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,               // header + sidebar + <Outlet/>
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "devices", element: <DeviceList /> },
      { path: "devices/:deviceId", element: <DeviceDetail />, loader: ({ params }) => getDevice(params.deviceId!) },
      { path: "reports", lazy: () => import("./routes/reports") },  // code-split route
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default function App() { return <RouterProvider router={router} />; }

function AppLayout() { return (<><nav><NavLink to="/devices">Devices</NavLink></nav><main><Outlet /></main></>); }

function DeviceList() {
  const [params, setParams] = useSearchParams();       // ?status=online&page=2
  const status = params.get("status") ?? "all";
  return <select value={status} onChange={(e) => setParams({ status: e.target.value })}>…</select>;
}
```
Key hooks: `useNavigate`, `useParams`, `useSearchParams`, `useLocation`, `useLoaderData`, `useNavigation` (pending state).

## Concepts to explain
- **Nested routes + `<Outlet/>`** — layouts persist while child routes change.
- **URL as state** — filters/sort/page in search params → shareable, survives refresh, back button works.
- **Loaders** fetch data before rendering the route (avoid fetch waterfalls); **actions** handle form mutations.
- **Lazy routes** → route-level code splitting.
- **Scroll restoration**, `<Link>` vs `<a>` (no reload), `replace` navigation for redirects.
- Hosting an SPA: server must return `index.html` for unknown paths (history fallback), otherwise refresh on `/devices/1` gives 404.
- `HashRouter` (`/#/devices`) only when you can't configure the server.

## Interview questions
1. **How does client-side routing work?** History API (`pushState`, `popstate`) + router matching URL to components.
2. **Why do deep links 404 on refresh?** Server doesn't fall back to `index.html`.
3. **Where would you keep filter state?** URL search params.
4. **How do you code-split by route?** `lazy` routes or `React.lazy` + Suspense.

Next → [Protected routes](protected-routes/README.md)
