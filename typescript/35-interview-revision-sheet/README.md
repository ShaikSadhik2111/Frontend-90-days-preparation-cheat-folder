# TypeScript — interview revision sheet

> Goal: be fluent enough to type a React app cleanly, explain generics, and solve 2–3 "write this utility type" questions.

---

## 1. Basics you must not stumble on

```ts
let id: number = 1;
let names: string[] = [];               // or Array<string>
let pair: [string, number] = ["a", 1];  // tuple
let anything: unknown;                  // safe "any": must narrow before use
function fail(msg: string): never { throw new Error(msg); }
function log(): void {}
```

### `type` vs `interface`
| | `interface` | `type` |
|---|---|---|
| Object shapes | ✅ | ✅ |
| Unions / primitives / tuples / mapped / conditional | ❌ | ✅ |
| Declaration merging (re-open) | ✅ | ❌ |
| `extends` | `interface B extends A` | `type B = A & {...}` |

Rule of thumb: `interface` for public object contracts (props, API models) that may be extended; `type` for unions and computed types. Be consistent — that is the real answer.

### `any` vs `unknown` vs `never`
- `any` turns off checking (contagious, avoid).
- `unknown` accepts anything but you must narrow before using it → use for `JSON.parse`, `catch (e)`, API input.
- `never` = impossible value. Used for exhaustive checks and functions that never return.

---

## 2. Unions, narrowing, discriminated unions (most practical TS skill)

```ts
type State =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: string };

function render(s: State) {
  switch (s.status) {
    case "idle": return "Start";
    case "loading": return "Loading…";
    case "success": return s.data.length;      // narrowed: data exists
    case "error": return s.error;
    default: {
      const _exhaustive: never = s;            // compile error if a case is added & not handled
      return _exhaustive;
    }
  }
}
```
This removes impossible states like `isLoading && error && data` all at once — mention it when discussing React state design.

Narrowing tools: `typeof`, `instanceof`, `in`, equality, truthiness, `Array.isArray`, and **custom type guards**:
```ts
function isUser(x: unknown): x is User {
  return typeof x === "object" && x !== null && "id" in x && "name" in x;
}
```
Assertion functions: `function assert(cond: unknown, msg: string): asserts cond { if (!cond) throw new Error(msg); }`

---

## 3. Generics

A generic is a **type parameter** — lets a function/component work for many types while keeping the relationship between input and output.

```ts
function first<T>(arr: T[]): T | undefined { return arr[0]; }
first([1, 2]);        // T = number

// constraint
function getProp<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }
getProp({ a: 1, b: "x" }, "b"); // string
getProp({ a: 1 }, "z");          // ❌ error

// default type
interface ApiResponse<T = unknown> { data: T; error?: string; }

// generic React component
type ListProps<T> = { items: T[]; renderItem: (item: T) => React.ReactNode; getKey: (item: T) => string };
function List<T>({ items, renderItem, getKey }: ListProps<T>) {
  return <ul>{items.map(i => <li key={getKey(i)}>{renderItem(i)}</li>)}</ul>;
}
```

---

## 4. Built-in utility types (know all of these)

| Utility | Does |
|---|---|
| `Partial<T>` / `Required<T>` | all props optional / required |
| `Readonly<T>` | all props readonly |
| `Pick<T, K>` / `Omit<T, K>` | keep / drop keys |
| `Record<K, V>` | object with keys K and values V |
| `Exclude<U, X>` / `Extract<U, X>` | filter a union |
| `NonNullable<T>` | remove null/undefined |
| `ReturnType<F>` / `Parameters<F>` | function return / params tuple |
| `Awaited<T>` | unwrap a promise |
| `InstanceType<C>` | type of `new C()` |

```ts
type UserForm = Omit<User, "id" | "createdAt">;
type UpdateUser = Partial<UserForm> & Pick<User, "id">;
type RoleMap = Record<"admin" | "viewer", Permission[]>;
```

---

## 5. Advanced types (be able to write these on a whiteboard)

```ts
// keyof / typeof / indexed access
const config = { api: "x", retries: 3 } as const;
type Config = typeof config;                 // { readonly api: "x"; readonly retries: 3 }
type ConfigKey = keyof Config;               // "api" | "retries"
type Retries = Config["retries"];            // 3

// mapped types — how Partial is implemented
type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type Mutable<T> = { -readonly [K in keyof T]: T[K] };

// conditional types + infer
type MyReturnType<F> = F extends (...args: any[]) => infer R ? R : never;
type ElementOf<T> = T extends (infer E)[] ? E : never;
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

// distributive conditional
type MyExclude<T, U> = T extends U ? never : T;   // distributes over unions

// template literal types
type EventName = `on${Capitalize<"click" | "focus">}`; // "onClick" | "onFocus"

// key remapping
type Getters<T> = { [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K] };

// deep partial
type DeepPartial<T> = { [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K] };
```

### `as const`, `satisfies`, assertions
```ts
const routes = { home: "/", user: "/user/:id" } satisfies Record<string, string>;
// validates the shape BUT keeps the object's own inferred type:
// routes.home ✅, routes.foo ❌ error. With `const routes: Record<string, string>`
// the key names are lost (routes.foo would compile).
const ROUTES = { home: "/", user: "/user/:id" } as const satisfies Record<string, string>;
// + `as const` → values keep literal types: typeof ROUTES.home is "/"
const el = document.getElementById("x") as HTMLInputElement; // assertion: you take responsibility
value!                                                           // non-null assertion: use rarely
```

### Function overloads
```ts
function parse(x: string): number;
function parse(x: number): string;
function parse(x: string | number) { return typeof x === "string" ? Number(x) : String(x); }
```

---

## 6. Typing React (daily work — be smooth here)

```tsx
type ButtonProps = React.ComponentPropsWithoutRef<"button"> & { variant?: "primary" | "ghost" };
export function Button({ variant = "primary", ...rest }: ButtonProps) {
  return <button data-variant={variant} {...rest} />;
}

const [user, setUser] = useState<User | null>(null);
const inputRef = useRef<HTMLInputElement>(null);

function onChange(e: React.ChangeEvent<HTMLInputElement>) { setQ(e.target.value); }
function onSubmit(e: React.FormEvent<HTMLFormElement>) { e.preventDefault(); }

type Action = { type: "add"; todo: Todo } | { type: "remove"; id: string };
function reducer(state: Todo[], action: Action): Todo[] { /* switch on action.type */ return state; }

const ThemeContext = React.createContext<Theme | undefined>(undefined);
function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be inside ThemeProvider");
  return ctx;   // non-undefined from here
}

// children
type CardProps = { title: string; children: React.ReactNode };
// forwardRef (React 18) — in React 19 `ref` is a normal prop
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>((p, ref) => <input ref={ref} {...p} />);
```

`React.ReactNode` (anything renderable) vs `React.ReactElement` (a JSX element only) vs `JSX.Element`.

---

## 7. Runtime validation boundary
TypeScript types disappear at runtime. Data from APIs, localStorage, URL params is `unknown` until validated. Use **Zod** (or similar):
```ts
const UserSchema = z.object({ id: z.string(), name: z.string(), email: z.string().email() });
type User = z.infer<typeof UserSchema>;
const user = UserSchema.parse(await res.json()); // throws if API contract changed
```
Say this in interviews — it shows production maturity.

---

## 8. tsconfig flags to know
`strict` (enables `strictNullChecks`, `noImplicitAny`…), `noUncheckedIndexedAccess`, `target`, `module`, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `paths`/`baseUrl` (aliases), `skipLibCheck`, `isolatedModules` (needed by Vite/Babel/SWC), `declaration`.

**Migration angle (your story):** Moving JS → TS gradually: `allowJs`, `checkJs`, start with `strict: false`, type the API layer and shared models first, then enable strict per folder; `.d.ts` for untyped legacy modules (`declare module "legacy-lib";`).

---

## 9. Practice: write these types yourself (answers above)
1. `MyPick<T, K>`  2. `MyReadonly<T>`  3. `MyReturnType<F>`  4. `DeepReadonly<T>`
5. `TupleToUnion<["a","b"]>` → `"a" | "b"` (answer: `T[number]`)
6. `First<T extends any[]>` (answer: `T extends [infer F, ...any[]] ? F : never`)
7. A typed `useFetch<T>(url): { data?: T; error?: Error; loading: boolean }`
8. Make `Button` accept all native button props plus `variant`.
More: github.com/type-challenges/type-challenges (do the *easy* + 10 *medium*).

## 10. Quick-fire questions
1. `type` vs `interface`? 2. `unknown` vs `any`? 3. What is `never` used for? 4. What are generics and why constraints? 5. Explain discriminated unions. 6. How do you type an API response? 7. `as const` vs `satisfies`? 8. What happens to types at runtime? 9. How do you type a custom hook / context? 10. How would you migrate a JS codebase to TS?
