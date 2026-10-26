# JSX

> JSX is **syntax sugar for creating React elements**. It is compiled to JavaScript function calls, so everything inside `{ }` is a JavaScript **expression**.

## What it compiles to
```jsx
const el = <h1 className="title">Hello, {name}</h1>;
// React 17+ automatic runtime compiles to:
import { jsx as _jsx } from "react/jsx-runtime";
const el = _jsx("h1", { className: "title", children: ["Hello, ", name] });
// older classic runtime: React.createElement("h1", { className: "title" }, "Hello, ", name)
```
The result is a plain object: `{ type: "h1", props: { className: "title", children: [...] }, key: null }`.
That's why the old rule "import React in every file" disappeared with the automatic runtime.

## Rules
- One root element per return → wrap siblings in `<>…</>` (Fragment) or `<Fragment key={id}>` when you need a key.
- `className` not `class`, `htmlFor` not `for`, camelCase events (`onClick`), `style={{ marginTop: 8 }}` (object, camelCase, numbers → px).
- All tags must close: `<img />`, `<br />`.
- Only **expressions** in `{ }` — no `if`, `for`, `switch` statements. Use ternary, `&&`, `map`, or compute before `return`.
- Comments: `{/* comment */}`.

## Rendering values
```jsx
{"text"} {42}            // rendered
{true} {false} {null} {undefined}   // render nothing
{0}                      // renders "0" ⚠️  → {count > 0 && <Badge/>}
{[<li key="a">a</li>, <li key="b">b</li>]}  // arrays render (need keys)
{{ a: 1 }}               // ❌ error: objects are not valid as a React child
```

## Escaping & XSS
JSX **escapes** strings automatically: `<p>{userInput}</p>` is safe even if `userInput` contains `<script>`.
Dangerous cases you must control:
- `dangerouslySetInnerHTML={{ __html: html }}` → sanitize with DOMPurify first.
- `<a href={userUrl}>` → a `javascript:` URL can run code; validate the protocol.

## Common bugs → fixes
| Bug | Fix |
|---|---|
| `{items.length && <List/>}` shows `0` | `{items.length > 0 && <List/>}` |
| "Adjacent JSX elements must be wrapped" | Use a Fragment |
| Rendering an object/Date directly | Format it: `{date.toLocaleDateString()}` |
| `if` inside JSX | Use ternary or compute a variable before `return` |

## Interview questions
1. **What is JSX? Is it required?** Syntax sugar for `jsx()`/`createElement()` calls; not required, but standard.
2. **Why `className`?** JSX maps to DOM properties; `class` is a reserved word in JS.
3. **How does React prevent XSS?** It escapes text content; only `dangerouslySetInnerHTML` (and URL attributes) bypass that.
4. **What does `<></>` do?** Groups children without adding a DOM node.

## Practice
Without running it, predict what renders: `{0 && "a"}`, `{"" || "b"}`, `{[1,2].map(n => n * 2)}`, `{null ?? "c"}`. Then verify.

Next → [Props](../props/README.md)
