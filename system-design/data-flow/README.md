# Frontend Data Flow

Model:
user intent → component event → state transition → query/mutation → network → validation → cache/store → render.

Distinguish:
- UI state
- server state
- derived state
- URL state
- persisted state.

Prevent duplicated sources of truth. Define ownership and update direction.

Practice: trace a filter change from URL input through API request, cache update and table render.