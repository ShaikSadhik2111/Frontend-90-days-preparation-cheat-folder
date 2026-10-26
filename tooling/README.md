# Tooling, testing, Git, CI (short but always asked)

## Build tools
- **Bundler** (webpack, Vite/Rollup, esbuild): resolves imports into optimised bundles; loaders/plugins transform files.
- **Transpiler** (Babel, SWC, tsc, esbuild): new JS/TS/JSX → JS the target browsers understand. Polyfills (core-js) add missing APIs.
- **Vite** vs **webpack**: Vite serves native ESM in dev (no bundling → instant start, fast HMR via esbuild pre-bundling of deps) and uses Rollup for production; webpack bundles everything in dev too, very configurable, Module Federation.
- **Tree shaking**: removing unused exports — needs ESM + side-effect-free modules (`"sideEffects": false`).
- **Code splitting**: dynamic `import()` → separate chunks loaded on demand.
- **Source maps**: map bundled code back to source for debugging (don't expose publicly if sensitive).
- **HMR**: swaps updated modules without full reload, keeping state.
- Env vars: `import.meta.env.VITE_X` / `process.env` — they are **public** once bundled.
- `package.json`: `dependencies` vs `devDependencies` vs `peerDependencies`; semver `^1.2.3` (minor+patch) vs `~1.2.3` (patch); lockfiles for reproducible installs; `npm ci` in CI.
- Monorepos: npm/pnpm workspaces, Nx, Turborepo.
- Lint/format: ESLint (rules, `eslint-plugin-react-hooks`!), Prettier, Husky + lint-staged pre-commit.

## Testing
- **Unit** (pure functions, hooks), **component/integration** (RTL: render, interact, assert), **E2E** (Playwright/Cypress real browser).
- RTL priority of queries: `getByRole` > `getByLabelText` > `getByPlaceholderText` > `getByText` > `getByTestId`.
- `getBy` (throws if missing), `queryBy` (null if missing → assert absence), `findBy` (async, waits).
- `userEvent` > `fireEvent` (realistic event sequence).
- Mock network with **MSW**; fake timers for debounce/throttle (`vi.useFakeTimers()` / `jest.useFakeTimers()`).
- Snapshot tests: use sparingly. Coverage is a signal, not a goal.
- TDD: red → green → refactor.

## Git (expect 2–3 questions)
- `merge` (keeps history, merge commit) vs `rebase` (linear history; never rebase shared/public branches).
- `git stash`, `cherry-pick <sha>`, `revert` (new commit undoing — safe on shared branch) vs `reset --soft/--mixed/--hard` (moves branch pointer).
- Resolving conflicts, `git log --oneline --graph`, `git bisect` to find the commit that introduced a bug.
- Branching: GitFlow vs trunk-based with feature flags; PR reviews; conventional commits.

## CI/CD
Pipeline: install (`npm ci`) → lint → type-check → unit tests → build → E2E → deploy (static hosting/CDN, Docker + Nginx). Cache dependencies. Preview deployments per PR. Rollback by redeploying previous artifact. Cache-busting via content hashes; `index.html` with `no-cache`.

## Monitoring in production
Error tracking (Sentry), RUM / Web Vitals, logs with correlation IDs, feature flags, source maps uploaded privately.
