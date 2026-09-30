# 31 — React + TypeScript

## Connection from Previous Topic

API/domain modeling gives us safe data contracts. React TypeScript applies those contracts to components, state, events, refs and reusable UI.

## Props

```tsx
type ButtonProps = {
  label: string;
  disabled?: boolean;
  onClick: () => void;
};

function Button({ label, disabled = false, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
```

## Events

```tsx
function SearchBox() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return <input onChange={handleChange} />;
}
```

Common types include `React.ChangeEvent<HTMLInputElement>`, `React.MouseEvent<HTMLButtonElement>`, `React.FormEvent<HTMLFormElement>`, and `React.KeyboardEvent<HTMLInputElement>`.

## State

Let inference work when the initial value is obvious:

```tsx
const [count, setCount] = useState(0);
```

Use an explicit union when the state can have meaningful alternatives:

```tsx
const [user, setUser] = useState<User | null>(null);
```

For complex async state, prefer a discriminated union rather than several independent booleans.

## Refs

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

## Children

```tsx
type CardProps = {
  children: React.ReactNode;
};
```

## Generic components

```tsx
type SelectProps<T> = {
  items: T[];
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
};

function Select<T>({ items, getLabel, onSelect }: SelectProps<T>) {
  return (
    <div>
      {items.map(item => (
        <button key={getLabel(item)} onClick={() => onSelect(item)}>
          {getLabel(item)}
        </button>
      ))}
    </div>
  );
}
```

The key benefit is that the selected item type remains connected to the callback.

## Reducer actions

```ts
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "set"; value: number };
```

A discriminated union makes reducer actions exhaustive and self-documenting.

## API integration

Keep the API/domain model separate from component props when the UI needs a different shape.

## Common mistakes

- using `any` for event/state/API data
- asserting API JSON instead of validating it
- over-annotating obvious state
- using several booleans for mutually exclusive states

## Interview questions

Be ready to type props, events, state, refs, children, reducers, generic components and API data without falling back to `any`.

## Mini challenge

Build a generic `Select<T>` that accepts `User[]`, preserves the selected `User` type in `onSelect`, and displays a loading/success/error state using a discriminated union.

## What This Unlocks Next

We have applied the type system to a real frontend stack. Next we combine the advanced pieces into reusable type-level designs:

**React + TypeScript → Advanced Types**.