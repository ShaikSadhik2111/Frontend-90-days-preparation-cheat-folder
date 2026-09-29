# 90–120 Day Full-Stack Product Engineer Roadmap

This is the execution roadmap for the next 90–120 days. The repository itself is the permanent topic-based knowledge base; this roadmap defines what to study and in what order.

## Goal
Build interview-ready and production-ready capability across:

JavaScript → TypeScript → React → Web Platform → Machine Coding → DSA → AI → Backend → Databases → Computer Science → System Design → Docker/CI/CD → Production Projects

The target is to explain fundamentals, solve interview problems, design systems, build production-quality applications, and discuss engineering trade-offs confidently.

## 1. Operating Model
Execution roadmap = what to study during the next 90–120 days.
Permanent cheat repository = where the knowledge is stored by topic.
Do not try to finish the entire repository sequentially. The repository is broader than the execution path.

Every study day should produce some combination of deep theory, practical examples, exercises, interview questions with direct answers, common mistakes, revision notes, practical application, GitHub update and a completion checklist.

## 2. Four Parallel Tracks
- Frontend: primary interview specialization
- DSA: daily interview problem solving
- AI: continuous modern engineering skill
- Backend/full-stack: gradually introduced and expanded

The primary specialization remains JavaScript + TypeScript + React + frontend architecture.

## 3. Phase 1 — Days 1–30: JavaScript + TypeScript + React Foundation

### JavaScript
Fundamentals; variables and data types; scope; hoisting; execution context; closures; this; prototypes; objects; arrays; strings; functions; higher-order functions; promises; async/await; event loop; callbacks; modules; error handling; memory management; garbage collection; debouncing; throttling; currying; memoization; polyfills; functional programming; generators/iterators; Map/Set/WeakMap/WeakSet; equality/coercion; destructuring/spread/rest; dynamic imports; abort/cancellation; CommonJS/ESM.

### TypeScript
Fundamentals; inference; interfaces; type aliases; unions/intersections; generics; constraints; utility types; mapped types; conditional types; keyof; typeof; indexed access types; template literal types; type guards; narrowing; discriminated unions; unknown vs any; never; satisfies; assertions; type compatibility; advanced types; API/domain modeling; React TypeScript.

### React
JSX; components; props; state; events; conditional rendering; rendering model; reconciliation; virtual DOM; keys; render cycle; hooks; forms; context; reducer; routing; data fetching; error handling; authentication and authorization concepts.

### Parallel DSA
Arrays; strings; hashing; two pointers; sliding window; prefix sum; complexity.

### Parallel AI
LLM fundamentals; prompting; structured output; LLM API integration.

## 4. Phase 2 — Days 31–50: Advanced React + Web Platform + Machine Coding

### Advanced React
Advanced hooks; custom hooks; state architecture; Redux; Zustand; server state; TanStack Query; caching/invalidation; profiling; memoization; virtualization; code splitting; lazy loading; Suspense; concurrent rendering concepts; useTransition; useDeferredValue; useSyncExternalStore; React 19 actions; optimistic UI; error boundaries; testing; accessibility; component architecture; feature-based architecture; design systems; frontend patterns.

### Web Platform
Semantic HTML; forms; accessibility; CSS box model; Flexbox; Grid; positioning; specificity; responsive design; browser rendering pipeline; DOM/CSSOM; event system; storage; workers; service workers; WebSockets; HTTP; REST; CORS; cookies/sessions; caching; Core Web Vitals; XSS; CSRF; CSP.

### Machine Coding
Modal; dropdown; tabs; accordion; toast; autocomplete; search; pagination; data table; sorting/filtering; forms; multi-step form; file upload; infinite scroll; virtualized list; drag-and-drop; Kanban; dashboard.

Every solution follows: Requirements → Components → State → Data flow → Implementation → Loading/error/empty → Edge cases → Accessibility → Testing → Performance.

### DSA
Stack; queue; linked list; binary search; recursion.

### AI
Embeddings; retrieval; RAG fundamentals.

## 5. Phase 3 — Days 51–70: Frontend System Design + Backend Introduction

### Frontend System Design
Requirements; constraints; trade-offs; estimation; architecture; component architecture; state management; API/data flow; caching; performance; scalability; security; micro-frontends; design systems; observability; testing; deployment; failure modes.

Practice: e-commerce frontend; food delivery; social media; analytics dashboard; trading dashboard; AI chat application.

### Backend
TypeScript → Node.js → HTTP → Express.
Study Node runtime; V8; event loop; libuv; non-blocking I/O; EventEmitter; streams; buffers; file system; environment variables; processes/signals; ESM/CommonJS; error handling; HTTP lifecycle; REST; middleware; routing; error middleware.

### Database introduction
SQL fundamentals; PostgreSQL; tables; relationships; constraints; joins; indexes; transactions; normalization; query plans; connection pooling.

### DSA
Trees; heap; greedy; intervals; sorting.

### AI
RAG; chunking; query transformation; vector databases.

## 6. Phase 4 — Days 71–90: Production Backend + Database + AI Applications

### Backend
Layered architecture; controllers; services; repositories; DTOs; validation; centralized errors; logging; request IDs; authentication; authorization; rate limiting; security headers; health checks; graceful shutdown.

### NestJS
Modules; controllers; providers; dependency injection; DTOs; pipes; guards; interceptors; exception filters; middleware; feature modules; testing; architecture.

### Database
PostgreSQL transactions; isolation; locking; indexing; query optimization; migrations; connection pools; Prisma or Drizzle; ORM trade-offs; SQL vs ORM.

### Redis
Caching; TTL; cache-aside; invalidation; sessions; rate limiting; pub/sub; distributed locks.

### Production backend
Authentication; authorization; file processing; background jobs; queues; WebSockets; real-time applications; testing; observability.

### AI
Tool calling; function calling; agents; context engineering; evaluation; hallucination control; guardrails; AI security.

### DSA
Graphs; backtracking; dynamic programming; trie; union-find; bit manipulation.

## 7. Phase 5 — Days 91–105: Computer Science + Production Engineering

### Operating Systems
Processes; threads; concurrency; memory; scheduling; synchronization; deadlocks; I/O.

### Networking
DNS; TCP/IP; HTTP; TLS; HTTP/2; HTTP/3; load balancing; proxies; connection pooling.

### Databases
Transactions; isolation levels; locks; indexes; replication; partitioning; consistency.

### Distributed Systems
Scalability; availability; consistency; fault tolerance; CAP concepts; idempotency; queues; caching; distributed locks; event-driven architecture.

### Docker
Images; containers; Dockerfile; layers; volumes; networks; Docker Compose; multi-stage builds; environment configuration.

### CI/CD
GitHub Actions; build pipelines; tests; Docker builds; deployment; environment management; rollbacks.

### Observability
Structured logging; metrics; tracing; health checks; error tracking; alerts.

## 8. Phase 6 — Days 106–120: Production Project + Interview Conversion

This phase can be compressed if the 90-day target is already achieved, or extended toward Day 120.

### Main project
Build one serious full-stack application:
React + TypeScript → NestJS / Node.js → PostgreSQL → Redis → background jobs → AI integration → Docker → CI/CD.

Demonstrate authentication, authorization, REST APIs, database relationships, validation, error handling, caching, file processing, AI integration, testing, logging, Docker and deployment.

### Interview conversion
JavaScript; TypeScript; React; browser; machine coding; DSA; frontend system design; backend fundamentals; SQL; AI engineering; behavioral and project discussions.

Every interview question in the cheat repository should contain a direct answer, explanation and example where useful.

## 9. DSA Runs Across All 90–120 Days
DSA is not a phase; it runs in parallel from Day 1.

Days 1–15: arrays, strings, hashing, complexity.
Days 16–30: two pointers, sliding window, prefix sum, stack, queue.
Days 31–45: linked list, binary search, recursion.
Days 46–65: trees, heap, intervals, sorting, greedy.
Days 66–85: graphs, backtracking, trie, union-find.
Days 86–105: dynamic programming, bit manipulation.
Days 106–120: mixed interview sets and timed problem solving.

Quality matters more than raw problem count: understand the pattern, solve independently, explain complexity, re-solve after spaced revision, and maintain a mistake log.

## 10. AI Runs Across All 90–120 Days
Foundation: LLMs → prompting → structured output → APIs.
Application: embeddings → retrieval → RAG → vector databases.
Advanced: tool calling → agents → context engineering → evaluation.
Production: guardrails → security → cost → latency → observability.
Project: integrate AI into the main production application.

## 11. Weekly Operating Rhythm
Monday–Friday: DSA + current roadmap topic + AI + project/GitHub.
Saturday: deep topic study + machine coding + project + DSA revision.
Sunday: weekly revision + interview questions + mistakes + system design + project cleanup + next-week planning.

## 12. Priority Order
### Tier 1 — Must master
JavaScript; TypeScript; React; DSA; Machine Coding; Frontend System Design.

### Tier 2 — Strong working knowledge
Browser/Web Platform; Node.js; Express; SQL/PostgreSQL; REST APIs; authentication/security; AI application development.

### Tier 3 — Production depth
Redis; NestJS; queues; testing; observability; Docker; CI/CD; deployment.

### Tier 4 — Advanced CS / architecture
Operating systems; networking depth; distributed systems; advanced database internals; microservices.

Tier 4 is not unimportant; the priority ordering protects the core interview preparation if time becomes tight.

## 13. Definition of Done
By the end of the roadmap, the goal is to:
- Explain JavaScript internals without memorized answers
- Write strong TypeScript
- Build React applications from scratch
- Design scalable frontend architecture
- Complete machine-coding problems under time constraints
- Solve common DSA patterns
- Explain browser and HTTP behavior
- Build REST APIs with Node/TypeScript
- Design PostgreSQL schemas and write SQL
- Implement authentication and authorization
- Use Redis appropriately
- Build AI-powered features using LLM APIs/RAG/tools
- Design frontend and backend systems
- Containerize applications with Docker
- Set up basic CI/CD
- Explain production concerns
- Discuss trade-offs in system-design interviews
- Demonstrate the skills through a real GitHub project.

## 14. Core Rule
Do not chase technology count.

Understand → Implement → Explain → Apply → Revise → Interview

The final objective is to take a problem from Requirement → UI → Frontend architecture → API → Backend → Database → AI → Testing → Docker → Deployment → Production trade-offs, and explain the important decisions at every layer.