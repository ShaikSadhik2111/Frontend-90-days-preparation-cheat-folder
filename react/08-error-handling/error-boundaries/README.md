# Error boundaries

> An error boundary is a component that **catches errors thrown while rendering its children**, shows a fallback UI, and lets the rest of the app keep working. Without one, a render error **unmounts the whole React tree** (blank page).

## Class implementation (the only built-in way)
```tsx
type Props = { fallback: React.ReactNode; children: React.ReactNode; onError?: (e: Error) => void };
type State = { hasError: boolean };

class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }     // render fallback
  componentDidCatch(error: Error, info: React.ErrorInfo) {                    // side effects: logging
    this.props.onError?.(error);
    console.error(error, info.componentStack);
  }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}
```
In practice use **`react-error-boundary`**:
```tsx
<ErrorBoundary
  FallbackComponent={({ error, resetErrorBoundary }) => (
    <div role="alert"><p>Widget failed: {error.message}</p><button onClick={resetErrorBoundary}>Retry</button></div>
  )}
  onReset={() => queryClient.resetQueries({ queryKey: ["telemetry"] })}
  resetKeys={[deviceId]}                          // auto-reset when deviceId changes
>
  <TelemetryChart deviceId={deviceId} />
</ErrorBoundary>
```
Inside event handlers/async code, `const { showBoundary } = useErrorBoundary()` lets you forward an error to the boundary.

## Placement strategy
- **Root** boundary: "Something went wrong — reload" + report.
- **Route** boundary: one per page (router `errorElement`).
- **Widget** boundary: each dashboard card/chart so one bad dataset doesn't kill the page.

## Doesn't catch
Event handlers, async code (`setTimeout`, promises), server-side rendering, errors thrown in the boundary itself.

## Interview questions
1. **What is an error boundary and why a class?** Catches render errors in children; hooks have no equivalent of `getDerivedStateFromError`/`componentDidCatch`.
2. **getDerivedStateFromError vs componentDidCatch?** Render fallback (render phase) vs side effects like logging (commit phase).
3. **How do you recover?** Reset state (retry button, `resetKeys`), refetch data.

Next → [Authentication](../../09-authentication/README.md)
