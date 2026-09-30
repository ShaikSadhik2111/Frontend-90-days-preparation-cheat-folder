# Advanced React + TypeScript Typing

## Required patterns

- Generic table/list components
- Generic render-prop components
- Component props derived from domain models
- Event typing for form/input handlers
- Ref typing with DOM and forwarded refs
- Discriminated props for mutually exclusive component modes

## Example reasoning

Instead of accepting `any` for a reusable table, model:

`Table<T> → columns for T → rows of T → renderers receive T`

This preserves the domain type through the component API.

## Interview focus

Be ready to explain:

- generic component inference
- `React.ComponentProps`
- event target/currentTarget differences
- ref typing
- discriminated component props
- when an assertion hides a real design problem
