# 04 — DOM & CSSOM

> The **DOM** is the browser's live object tree of the document; the **CSSOM** is the parsed tree of styles. JavaScript reads/writes both; React ultimately calls these APIs for you.

## Core DOM APIs (be able to write vanilla JS)
```js
const list = document.querySelector("#devices");          // first match (CSS selector)
const rows = document.querySelectorAll(".row");           // static NodeList
const li = document.createElement("li");
li.textContent = name;                                    // safe (no HTML parsing)
li.dataset.id = id;                                       // data-id attribute
li.classList.add("row", "online");
list.append(li);                                          // also: prepend, before, after, replaceWith, remove()

// batch inserts with a fragment → one reflow
const frag = document.createDocumentFragment();
items.forEach((i) => { const el = document.createElement("li"); el.textContent = i; frag.append(el); });
list.append(frag);
```
- `textContent` (raw text, fast, safe) vs `innerText` (rendered text, triggers layout) vs `innerHTML` (parses HTML — **XSS risk** with user input).
- `querySelectorAll` returns a **static** NodeList; `getElementsByClassName` returns a **live** HTMLCollection.
- Attributes vs properties: `input.getAttribute("value")` = initial HTML value; `input.value` = current value.
- Traversal: `parentElement`, `children`, `closest(".card")`, `matches(".active")`, `nextElementSibling`.

## Reading layout (forces style/layout calculation)
`offsetWidth/Height`, `clientWidth`, `scrollTop`, `getBoundingClientRect()`, `getComputedStyle()`.
```js
// ❌ layout thrashing: read → write → read → write … forces layout every iteration
items.forEach((el) => { el.style.height = el.offsetHeight + 10 + "px"; });
// ✅ batch reads, then writes
const heights = items.map((el) => el.offsetHeight);
items.forEach((el, i) => { el.style.height = heights[i] + 10 + "px"; });
```

## Observers (modern, efficient)
- `IntersectionObserver` — visibility (lazy loading, infinite scroll, analytics impressions).
- `ResizeObserver` — element size changes (responsive charts).
- `MutationObserver` — DOM changes (third-party widgets, legacy integrations).

## Classic interview exercise: `getElementsByClassName` polyfill (tree traversal)
```js
function getByClass(root, className) {
  const result = [];
  (function walk(node) {
    if (node.classList?.contains(className)) result.push(node);
    for (const child of node.children) walk(child);
  })(root);
  return result;
}
```

## Shadow DOM vs Virtual DOM
Shadow DOM = browser feature for encapsulated DOM/styles in Web Components. Virtual DOM = React's in-memory element tree. Unrelated concepts with similar names.

## Interview questions
1. What is the DOM? DOM vs HTML source?
2. `textContent` vs `innerText` vs `innerHTML`?
3. What is layout thrashing and how do you avoid it?
4. Live vs static collections?
5. Write a function that finds all elements with a class (tree walk).

Next → [05 Events & delegation](../05-events-and-delegation/README.md)
