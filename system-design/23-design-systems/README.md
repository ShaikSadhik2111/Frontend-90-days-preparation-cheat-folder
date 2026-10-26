# 23 — Design systems (design view)

## Design it like a product
**Users**: product teams. **Goal**: consistent, accessible UI built faster.
- **Tokens** (colour, spacing, typography, radius, elevation, motion) → CSS variables → themes (light/dark/brand), density modes.
- **Components**: primitives (Button, Input, Select, Checkbox, Modal, Tooltip, Tabs, Table, Toast) + patterns (forms, empty/error states, layouts).
- **Accessibility** built in (APG patterns, focus, contrast), RTL & i18n support.
- **Tech**: React + TS (or Web Components for multi-framework orgs), headless primitives (Radix/React Aria) + styling, tree-shakable ESM package.
- **Docs**: Storybook (usage, props tables, a11y addon, do/don't), design-tool kit in sync with code.
- **Quality**: unit + interaction tests, visual regression (Chromatic/Playwright screenshots), bundle size checks.
- **Distribution**: monorepo package, semver, changelog (Changesets), codemods for breaking changes, deprecation policy.
- **Governance**: contribution model, design review, adoption metrics, support channel.

## Trade-offs
Build vs adopt (MUI/AntD + theming) · strict vs flexible APIs · CSS-in-JS runtime cost vs CSS Modules/Tailwind · supporting multiple frameworks (web components) vs React-only.

Details: [react/16-architecture/design-systems](../../react/16-architecture/design-systems/README.md).

Next → [24 Specialized systems](../24-specialized-systems/README.md)
