# Data Flow
Use user event → state transition → request/action → result → state → render.

Define who owns data and who can mutate it. Avoid duplicated sources of truth.

Practice: trace a table filter from input to API request to rendered rows.