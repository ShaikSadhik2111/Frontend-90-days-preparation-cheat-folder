# Frontend Deployment Design

Key concerns:
- immutable hashed assets
- CDN delivery
- cache headers
- environment configuration
- rollback
- source maps
- feature flags
- progressive rollout
- release monitoring.

Avoid asset mismatch between old HTML and new JS by using immutable versioned assets and compatible rollout strategy.

Practice: design deployment for a SPA with 5 teams releasing independently every week.