# Polling
Poll only when freshness requirements justify it. Stop timers on unmount, hidden pages or logout when appropriate.

Avoid overlapping requests and uncontrolled intervals. Back off after errors when appropriate.

Follow-up: replace polling with SSE/WebSocket and explain why.