# Frontend Scale Estimation

Estimate with assumptions, not false precision.

Useful formulas:
- requests/day = users × sessions/user × requests/session
- average RPS = requests/day ÷ 86,400
- peak RPS = average × peak factor
- bandwidth = requests/sec × average payload
- concurrent connections ≈ arrival rate × average session/connection duration

Example: 200k DAU × 4 sessions × 10 API requests = 8M requests/day ≈ 93 average RPS. With 5× peak, plan around 465 peak RPS.

Frontend-specific estimates: JS bundle size, image bytes, DOM nodes, list rows, WebSocket connections and polling frequency.

Always ask what peak factor and payload size are expected.