# Reusable components

> A reusable component is easy to use correctly and hard to use wrongly: **clear props, sensible defaults, composition-friendly, accessible, typed**.

## Example: a reusable Button
```tsx
type ButtonProps = React.ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md";
  loading?: boolean;
  leftIcon?: React.ReactNode;
};

export function Button({ variant = "primary", size = "md", loading = false, leftIcon, disabled, children, className = "", type = "button", ...rest }: ButtonProps) {
  return (
    <button
      type={type}                                   // avoid accidental form submit
      className={`btn btn--${variant} btn--${size} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <Spinner aria-hidden /> : leftIcon}
      <span>{children}</span>
    </button>
  );
}
```

## Techniques
- **Generic components** (`<Select<T>>`, `<Table<Row>>`) with `getKey`/`getLabel`/`renderCell` props.
- **Compound components** (Tabs, Accordion, Menu) share state via context.
- **Controlled + uncontrolled** support (`value`/`defaultValue`/`onChange`).
- **Slots** (`header`, `footer`, `children`) instead of 20 config props.
- **Polymorphic `as` prop** (`<Text as="h2">`) — powerful but complex to type; use sparingly.
- **Headless hooks** (`useCombobox`) when teams need different visuals.

## Avoid
Boolean prop explosion · leaking internal state · hard-coded data fetching inside UI components · `any` props · swallowing `className`/`ref`.

**Practice:** build a generic `Select<T>` that supports keyboard navigation and `getLabel`. Compare with the generic `Autocomplete<T>` in `code/machine-coding`.

Next → [Frontend patterns](../frontend-patterns/README.md)
