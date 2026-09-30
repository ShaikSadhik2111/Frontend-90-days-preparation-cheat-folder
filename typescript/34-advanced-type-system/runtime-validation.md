# Runtime Validation Boundary

TypeScript protects code at compile time. API responses, uploaded files, local storage and user input arrive at runtime.

## Boundary

`unknown external data → runtime schema validation → trusted typed value`

A schema library such as Zod or Valibot can perform runtime validation and expose inferred TypeScript types.

## Why this matters

Without validation, this is unsafe:

`const data = response as User`

The assertion changes the compiler's belief, not the network payload.

## Production use

Validate API responses at a BFF/client boundary, validate configuration at startup, and validate untrusted form/file data before domain logic consumes it.

## Interview question

Why isn't a TypeScript interface enough to validate an API response?
