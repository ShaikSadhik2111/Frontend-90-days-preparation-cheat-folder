# Testing Machine-Coded Components

Unit tests: sorting, filtering, reducers and validators.

Component tests: click, type, keyboard, loading/error/empty behavior.

Integration tests: component plus realistic async/data behavior.

Test behavior rather than implementation. Prefer “typing a query shows results” over asserting an internal setter.

Edge matrix: empty input, empty result, slow response, failed response, retry, duplicate action, rapid repeated action, keyboard path, disabled state and unmount during async work.

Accessibility: accessible name, keyboard reachability, focus management, semantic roles and appropriate error announcements.

Large-data performance: render time, DOM size, scrolling and memory where relevant.

If time is short, explain the highest-risk tests and the invariant each protects.