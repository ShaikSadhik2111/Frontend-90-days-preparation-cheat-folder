# Design systems & component libraries

> A design system = **design tokens + reusable components + guidelines + documentation**, so many teams build consistent, accessible UI faster.

## Building blocks
- **Tokens:** colour, spacing, typography, radius, shadows, z-index, motion — as CSS variables (`--color-primary`) → theming and dark mode with no JS.
- **Primitives:** Button, Input, Select, Checkbox, Modal, Tooltip, Tabs, Table, Toast — accessible by default.
- **Patterns:** forms, empty states, error pages, page layouts.
- **Headless + styled:** behaviour/a11y from headless libraries (Radix UI, React Aria, Headless UI) + your styles. Or full libraries (MUI, Ant Design) themed to your brand.

## Component API checklist
TypeScript props · `variant`/`size` unions · `...rest` + `className` forwarding · `ref` forwarding · controlled & uncontrolled · keyboard and ARIA per APG · RTL support · loading/disabled states · no business logic.

## Delivery
- Monorepo package (`@company/ui`), **semantic versioning**, changelog (Changesets), codemods for breaking changes.
- **Storybook** for docs/playground + a11y addon; visual regression (Chromatic/Playwright screenshots); unit tests per component.
- Track adoption; deprecate old components gradually.

## Migration angle (strong interview story)
During AngularJS → React migration, a React component library that **matches the existing look** lets migrated screens blend in. Shared **tokens** (CSS variables) can style both AngularJS and React screens at the same time.

**Interview:** *How would you build a component library for multiple teams?* Tokens → accessible primitives → docs/Storybook → versioned package → visual tests → governance (contribution guidelines, design review).

Next → [Reusable components](../reusable-components/README.md)
