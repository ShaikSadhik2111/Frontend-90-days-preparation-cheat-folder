# AngularJS → React migration (your biggest selling point)

> Most candidates say "I know React". You can say **"I migrated a live enterprise AngularJS product to React incrementally, without stopping feature delivery."**
> Interviewers at Siemens, Honeywell, Continental, Schneider, Bosch-like product teams have *exactly* this legacy problem. Prepare this file better than any other.

---

## Part A — AngularJS (1.x) concepts you'll be asked

| Concept | Explain in one line |
|---|---|
| **Two-way binding** | `ng-model` keeps view ↔ `$scope` in sync via watchers. |
| **`$scope` & scope inheritance** | Child scopes prototypically inherit from parent → "dot rule" (`ng-model="vm.name"`, not `name`) to avoid shadowing. `$rootScope` is global. |
| **Digest cycle** | `$digest` loops through all watchers, compares old/new (dirty checking), repeats until stable (max 10 iterations → `infdig` error). `$apply` triggers digest from outside Angular (e.g. 3rd-party callbacks, `setTimeout` → use `$timeout`). |
| **Performance problem** | Cost grows with number of watchers (> ~2000 is slow). Fixes: one-time binding `::`, `track by` in `ng-repeat`, fewer watchers, `$watchCollection` instead of deep watch, `ng-if` vs `ng-show`. |
| **DI** | Services injected by name; minification-safe with array annotation `['$http', function($http){}]` or `$inject`. |
| **Service vs Factory vs Provider** | `factory` returns an object; `service` is a constructor called with `new`; `provider` is configurable in `config` phase (`$get`). All singletons. |
| **Directives** | `restrict: 'EACM'`, isolate scope bindings `@` (string), `=` (two-way), `<` (one-way, 1.5+), `&` (callback); `link` vs `controller` vs `compile`. |
| **Components (1.5+)** | `angular.module().component()` with `bindings`, `controllerAs: '$ctrl'`, lifecycle hooks `$onInit`, `$onChanges`, `$doCheck`, `$onDestroy`. Easiest unit to migrate. |
| **`$q`, `$http`, interceptors** | Promises tied to digest; interceptors for auth headers & error handling. |
| **Routing** | `ngRoute` or `ui-router` (states, nested views, resolves). |
| **Filters** | `{{ amount \| currency }}`; custom filters must be pure/fast. |
| **`ng-if` vs `ng-show`** | `ng-if` removes from DOM (new scope), `ng-show` toggles CSS. |
| **Events** | `$emit` (up), `$broadcast` (down), `$on`; overuse = spaghetti. |
| **Security** | `$sce` / strict contextual escaping, `ng-bind-html` + `$sanitize`. |
| **Why migrate** | AngularJS **end of life Dec 31 2021** — no security patches, hiring hard, poor performance with many watchers, no modern tooling/TypeScript ergonomics. |

### Angular (2+) — expect comparison questions
- Components + **NgModules** or **standalone components** (default since v17), TypeScript first, decorators (`@Component`, `@Input`, `@Output`, `@Injectable`).
- **Change detection**: Zone.js patches async APIs and triggers checks top-down; `ChangeDetectionStrategy.OnPush` → check only when inputs change by reference / events / async pipe. Newer: **Signals** (`signal`, `computed`, `effect`) and zoneless change detection.
- **RxJS**: Observables, `switchMap` (cancel previous — search), `mergeMap`, `concatMap`, `debounceTime`, `distinctUntilChanged`, `takeUntil` / `takeUntilDestroyed` for cleanup; `async` pipe.
- Services + hierarchical DI (`providedIn: 'root'`), Router with guards (`canActivate`) & resolvers, Reactive Forms vs Template-driven, lifecycle hooks (`ngOnInit`, `ngOnChanges`, `ngOnDestroy`), `@if/@for` control flow (v17).

### AngularJS vs Angular vs React
| | AngularJS | Angular | React |
|---|---|---|---|
| Type | MVC framework | full framework | UI library |
| Language | JS | TypeScript | JS/TS + JSX |
| Data flow | two-way | one-way + `[(ngModel)]` | one-way |
| Change detection | dirty-checking digest | Zone.js / Signals | re-render + VDOM diff |
| DI | built in | built in, hierarchical | none (context/props) |
| Routing/forms/http | built in | built in | ecosystem choices |

---

## Part B — Migration strategies (know all; explain why you chose yours)

1. **Big-bang rewrite** — freeze features, rebuild everything. High risk, long time with no business value; usually rejected.
2. **Incremental / Strangler Fig pattern** (most common, recommended) — new features in React, old screens migrated one by one; both run in production together until AngularJS is "strangled".
   - **React inside AngularJS**: wrap React components as AngularJS components/directives (`react2angular`, `ngReact`, or a custom directive that calls `createRoot(el).render(<Comp {...props}/>)` in `$onInit`/`$onChanges` and `root.unmount()` in `$onDestroy`).
   - **AngularJS inside React** (less common): `angular2react` for legacy widgets during transition.
   - **Route-by-route**: router decides which app owns a route; shared shell (header/nav).
3. **Micro-frontends** — `single-spa` or Module Federation: AngularJS and React apps as separately deployed parcels; good for multiple teams; adds complexity (shared deps, styling isolation, routing).
4. **AngularJS → Angular (ngUpgrade)** — hybrid app; not relevant if target is React, but know it exists.

### The hard problems (and good answers)
| Problem | Approach |
|---|---|
| **Shared state** between AngularJS & React | Put state in a framework-agnostic store (Redux/plain observable service) that both subscribe to; or AngularJS service exposed to React via a bridge; avoid two sources of truth. |
| **Digest awareness** | When React changes data AngularJS owns, call `$scope.$applyAsync()` so the digest picks it up. When AngularJS passes props, re-render React in `$onChanges`. |
| **Routing** | One router owns URL; the other listens (`$locationChangeSuccess` / `history` events). Avoid double navigation & full reloads. |
| **Auth/session & HTTP** | Move `$http` interceptors logic into a shared API client (axios/fetch wrapper) used by both. |
| **Styling** | Shared design tokens/CSS variables; build new React component library matching old look; CSS Modules to avoid global collisions. |
| **i18n** | Share translation JSON; `angular-translate` and `react-i18next` reading the same keys. |
| **Build** | Single bundler (webpack/Vite) compiling both; code-split AngularJS bundle so React pages don't pay for it. |
| **Testing** | Characterization tests on old behaviour before migrating; RTL + Jest for React; E2E (Cypress/Playwright/Protractor replacement) across both. |
| **Feature parity** | Inventory every feature/edge case of the old screen (this is where you "understood old features" with your senior). Use feature flags to switch old ↔ new per user group, roll back fast. |
| **Prioritisation** | Migrate leaf components first (no deps), then high-traffic/high-pain screens; keep business delivering features. |
| **Measuring success** | % screens migrated, bundle size, page load/INP, defect rate, dev velocity, removal of AngularJS deps. |

---

## Part C — Your STAR story (fill in your real numbers — never invent)

> Practise until you can tell it in **2 minutes** (short) and **6–8 minutes** (deep dive with architecture diagram).

**Situation** — "Our product at Bosch was a large AngularJS 1.x application (~__ modules/__ screens, used by __ users/plants/engineers). AngularJS reached end-of-life in 2021, performance degraded on data-heavy screens, and new features were slow to build."

**Task** — "With a senior developer, I was responsible for designing and executing an incremental migration to React while continuing to deliver new features in parallel for 4+ years."

**Action** — pick what's true for you:
- Analysed legacy features & hidden behaviours of AngularJS screens; documented feature parity checklists.
- Chose strangler approach: React components embedded via a bridge directive / route-level split, shared header & auth.
- Built shared layer: API client with interceptors, state store/service bridge, design-system components in React + TypeScript.
- Migrated screen-by-screen starting with __, used feature flags, wrote RTL/Jest tests and E2E checks.
- Built new features directly in React (examples: __, __).
- Handled tricky bits: digest/`$applyAsync` sync, routing ownership, memory leaks from unmounted roots, styling collisions.
- Code reviews, knowledge sharing with team, defined coding standards for React.

**Result** — numbers! e.g. "Migrated __% of screens / __ of __ modules; page load from __s to __s; bundle reduced __%; production defects in migrated areas down __%; feature delivery time reduced; zero downtime."

**Learning** — "Incremental beats rewrite; invest early in the shared layer; feature-parity inventory is the real work; measure before/after."

### Deep-dive questions to rehearse
1. Why React and not Angular (2+)?
2. Why not a full rewrite?
3. How did AngularJS and React share state / communicate? Show code.
4. How did you handle routing and deep links?
5. What broke in production during migration and how did you fix it?
6. How did you ensure feature parity? How did you test?
7. How did you decide the order of migration?
8. How did you manage performance with both frameworks loaded?
9. What would you do differently today? (TypeScript from day 1, Vite, TanStack Query, micro-frontends if more teams, earlier E2E coverage)
10. What was *your* contribution vs your senior's? (Be honest and specific: "I designed X, I implemented Y, I led Z.")

### Bridge code you should be able to write on a whiteboard
```js
// AngularJS component that renders a React component
import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { UserCard } from "./react/UserCard";

angular.module("app").component("reactUserCard", {
  bindings: { user: "<", onSelect: "&" },
  controller: ["$element", "$scope", function ($element, $scope) {
    let root;
    const render = () => root.render(createElement(UserCard, {
      user: this.user,
      // call back into AngularJS and make sure a digest runs
      onSelect: (id) => $scope.$applyAsync(() => this.onSelect({ id })),
    }));
    this.$onInit = () => { root = createRoot($element[0]); render(); };
    this.$onChanges = () => { if (root) render(); };
    this.$onDestroy = () => root.unmount();   // prevents leaks
  }],
});
// usage in AngularJS template: <react-user-card user="vm.user" on-select="vm.pick(id)"></react-user-card>
```

**Resume bullet examples** (replace blanks with your real data):
- "Co-led incremental AngularJS → React 18 + TypeScript migration of a __-module enterprise application using the strangler pattern, delivering new features in parallel with zero downtime."
- "Built a bridge layer (React-in-AngularJS components, shared API client, shared store) enabling __ screens to be migrated independently."
- "Improved load time of __ dashboard by __% via code splitting, memoization and list virtualization."
