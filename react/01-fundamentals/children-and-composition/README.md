# Children and composition

> React favours **composition over inheritance**: build complex UI by passing components/elements into other components (`children`, slot props), not by extending classes.

## `children`
```tsx
function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="card">
      <h2>{title}</h2>
      <div className="card__body">{children}</div>
    </section>
  );
}

<Card title="Device status">
  <StatusBadge status="online" />
  <p>Last seen 2 min ago</p>
</Card>
```
`React.ReactNode` = anything renderable (elements, strings, numbers, arrays, null, fragments).

## Slots — multiple "holes"
```tsx
function Layout({ header, sidebar, children }: { header: React.ReactNode; sidebar: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}
<Layout header={<TopBar />} sidebar={<Nav />}>…</Layout>
```

## Composition solves prop drilling
```tsx
// ❌ App → Page → Sidebar → UserMenu all receive `user`
// ✅ App builds UserMenu and passes the element down
function App() {
  const user = useUser();
  return <Page sidebar={<Sidebar menu={<UserMenu user={user} />} />} />;
}
```

## Composition and performance
Elements passed as `children` are created by the **parent**. If the wrapper re-renders because of its *own* state, the `children` element is the same object → React can skip re-rendering it.
```tsx
function ScrollTracker({ children }: { children: React.ReactNode }) {
  const [y, setY] = useState(0);          // changes often
  useEffect(() => { const f = () => setY(window.scrollY); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  return <div><Progress y={y} />{children}</div>;   // `children` does NOT re-render on scroll
}
```
This "move state down / lift content up" trick often beats `React.memo`.

## Other composition patterns
- **Compound components** — `<Tabs><Tabs.List/><Tabs.Panel/></Tabs>` share state via context (see the Tabs machine-coding problem).
- **Render props** — `<DataLoader render={(data) => <Chart data={data} />} />`; mostly replaced by hooks, still used for headless components.
- **HOC** — `withAuth(Component)` returns a new component; legacy, but asked in interviews (downsides: wrapper hell, prop collisions, hidden props).
- **`React.Children` / `cloneElement`** — manipulate children; considered fragile, prefer context or explicit props.

## Common bugs → fixes
| Bug | Fix |
|---|---|
| Deep prop drilling | Pass elements/children instead of data |
| Wrapper re-render re-renders everything | Pass expensive parts as `children` |
| Using `cloneElement` to inject props | Use context or a render prop |

## Interview questions
1. **Composition vs inheritance in React?** React recommends composition; inheritance between components is practically never needed.
2. **What is `children`?** A normal prop holding whatever is between the tags.
3. **HOC vs render props vs hooks?** All reuse logic; hooks are simplest (no extra tree nesting), HOCs/render props still appear in older code and libraries.
4. **How can composition improve performance?** Content passed as children isn't re-created when the wrapper's own state changes.

## Practice
Build a `Modal` that accepts `title`, `footer` and `children` slots, and a `Page` layout with `header`/`sidebar` slots. Then remove one level of prop drilling in your project with composition.

### Solution

**Idea:** The parent decides **what** to show; the wrapper decides **where** to show it. Slots are just props containing JSX.

```tsx
import type { ReactNode } from "react";

type ModalProps = {
  title: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
};

function Modal({ title, footer, children }: ModalProps) {
  return (
    <div className="modal">
      <h2>{title}</h2>
      <div>{children}</div>
      <footer>{footer}</footer>
    </div>
  );
}

type PageProps = {
  header: ReactNode;
  sidebar: ReactNode;
  children: ReactNode;
};

function Page({ header, sidebar, children }: PageProps) {
  return (
    <div>
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}
```

Usage:

```tsx
function App() {
  return (
    <Page header={<h1>Dashboard</h1>} sidebar={<nav>Home | Profile</nav>}>
      <Modal title="Profile" footer={<button type="button">Save</button>}>
        <p>Edit your profile here.</p>
      </Modal>
    </Page>
  );
}
```

`title`, `footer`, `header`, and `sidebar` are **named slots**. Content between opening and closing tags becomes **`children`**.

This example shows composition only. A production modal also needs open/close behavior, focus management, Escape handling, and accessible dialog semantics.

### Removing one level of prop drilling

**Before:** `Page` receives `user` only to pass it to `UserMenu`.

```tsx
type User = { name: string };

function UserMenu({ user }: { user: User }) {
  return <p>{user.name}</p>;
}

function Page({ user, children }: { user: User; children: ReactNode }) {
  return (
    <div>
      <aside><UserMenu user={user} /></aside>
      <main>{children}</main>
    </div>
  );
}

<Page user={user}><p>Account content</p></Page>
```

**After:** Use the slot-based `Page` above. The parent creates `UserMenu` directly (`user` is the parent's existing data).

```tsx
<Page header={<h1>Account</h1>} sidebar={<UserMenu user={user} />}>
  <p>Account content</p>
</Page>
```

**Interview answer:** "Composition means building UI by passing components through props or children. Here, `Page` no longer needs to know about `user`; it only renders the sidebar element. This removes one level of prop drilling without context."

Next → [Lifting state](../lifting-state/README.md)
