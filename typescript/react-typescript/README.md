# React + TypeScript

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

Common event types:
- `React.ChangeEvent<HTMLInputElement>`
- `React.MouseEvent<HTMLButtonElement>`
- `React.FormEvent<HTMLFormElement>`
- `React.KeyboardEvent<HTMLInputElement>`

## State

```tsx
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);
```

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

## Generic component

```tsx
type SelectProps<T> = {
  items: T[];
  getLabel: (item: T) => string;
  onSelect: (item: T) => void;
};
```

## Reducer actions

```ts
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "set"; value: number };
```

Use discriminated unions for reducers and explicit UI state.

## Interview focus

Know props, events, state, refs, children, reducers, generic components and typed API data without falling back to `any`.