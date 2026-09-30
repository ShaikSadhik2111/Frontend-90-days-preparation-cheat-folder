# Machine Coding Fundamentals

First five minutes: clarify exact behavior, inputs/outputs, API vs local data, persistence, responsive behavior, accessibility, loading/error/empty states, performance constraints and time.

Example autocomplete tree:
SearchPage → SearchBox → Input + LoadingIndicator + SuggestionList → SuggestionItem.

State should include input, debounced query, request status, results, highlighted index, selection and error. Avoid derived state duplication.

Vertical slice: input → state → action → result. Finish one complete path before polishing.

State matrix: idle, loading, success, empty, error, retry.

60-minute example: 5 requirements, 10 design/state, 30 core, 10 edge/a11y, 5 tests/explanation.

Communicate decisions: “I keep this state local because only this feature consumes it.”

Challenge: design a table before writing code.