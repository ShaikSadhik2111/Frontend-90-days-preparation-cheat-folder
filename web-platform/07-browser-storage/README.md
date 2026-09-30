# 07 — Browser Storage

**Connection:** network data and UI state sometimes need persistence.

**Learn:** cookies, localStorage, sessionStorage, IndexedDB, quotas, serialization, transactions, versioning and eviction.

**Example**
```js
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme");
```

Use IndexedDB for larger structured client data.

**Production:** preferences, drafts, offline data and caches.

**Pitfalls:** secrets in localStorage, synchronous storage abuse, quota failures and stale data without invalidation.

**Interview:** localStorage vs IndexedDB? Why cookies are different? Where should auth state live? What happens at quota?

**Challenge:** persist small preferences in localStorage and large drafts in IndexedDB.

**Next:** HTTP.