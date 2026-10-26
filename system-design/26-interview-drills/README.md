# 26 — System design interview drills

## Follow-up questions interviewers ask (prepare answers for each design)
1. What changes at **10× users / 10× data**?
2. What if the **network is slow or offline**?
3. What if **two users edit the same item** at once?
4. What if the **WebSocket disconnects** for 2 minutes?
5. How do you keep the page fast on a **low-end device**?
6. How do you make it **accessible** to keyboard and screen-reader users?
7. How do you **secure** it? Where are tokens stored?
8. How do you **test** it? What would you monitor in production?
9. How do you **roll out** a risky change safely?
10. What would you build **first** (MVP) and what later?

## Timed prompts
| Prompt | Time | Focus |
|---|---|---|
| Autocomplete | 30 min | debounce, cancel, cache, a11y |
| IoT dashboard | 45 min | real-time, throttling, memory, partial failure |
| News feed | 45 min | cursor pagination, virtualization, optimistic likes |
| Chat | 45 min | WebSocket, ordering, offline outbox |
| Data grid 100k rows | 45 min | virtualization, server ops, keyboard grid |
| E-commerce listing | 45 min | SSR/SEO, filters in URL, images |
| Kanban | 45 min | drag & drop, ordering ranks, real-time sync |
| File upload | 30 min | chunking, concurrency, resume |
| Micro-frontend migration | 45 min | strangler, shell, shared deps |

## Mock format
Interviewer reads the prompt; you drive RADIO; interviewer injects one follow-up every 10 minutes from the list above. Score: requirements, architecture, data/API, depth, trade-offs, communication (1–5 each).
