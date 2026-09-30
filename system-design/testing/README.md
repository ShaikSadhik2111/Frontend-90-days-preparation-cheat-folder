# System Design Testing

Test architecture through contracts and failure scenarios, not only component snapshots.

Layers:
- unit domain logic
- API contract tests
- component tests
- integration tests
- end-to-end critical journeys
- performance tests
- accessibility tests
- resilience/failure tests.

Design test seams around module and API boundaries.

Practice: create a test matrix for dashboard, search and file upload including timeout, stale response, 403, empty and offline cases.