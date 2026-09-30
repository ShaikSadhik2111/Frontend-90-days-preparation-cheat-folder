# Declaration Merging and Module Augmentation

## Why

Large TypeScript applications often need to extend declarations supplied by another module without editing that dependency.

## Key distinction

**Declaration merging** combines compatible declarations with the same name.

**Module augmentation** extends declarations exported by an existing module.

**Global augmentation** extends declarations in the global scope from within a module.

## Production example

A design-system package exposes a component API, while an application needs to add a project-specific type to the module's declarations. The augmentation belongs in a controlled `.d.ts`/types boundary.

## Pitfalls

- The augmentation must be included by the compiler.
- Module augmentation cannot introduce an entirely new top-level declaration; it augments an existing module.
- Runtime behavior is not changed merely because TypeScript declarations are augmented.

## Interview reasoning

Explain the difference between changing the type system's view of a library and changing the JavaScript runtime implementation.
