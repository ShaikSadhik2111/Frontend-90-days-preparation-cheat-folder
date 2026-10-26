// Fake backend so every component works offline. Latency is random on purpose
// so you can SEE race conditions if you remove the protection in components.

export type User = { id: number; name: string; email: string; role: "Admin" | "Engineer" | "Viewer"; age: number };

const FIRST = ["Aarav", "Priya", "Rahul", "Sneha", "Vikram", "Ananya", "Karthik", "Divya", "Arjun", "Meera", "Rohan", "Kavya", "Siddharth", "Ishita", "Nikhil", "Pooja", "Aditya", "Neha", "Varun", "Lakshmi"];
const LAST = ["Sharma", "Reddy", "Iyer", "Khan", "Patel", "Nair", "Gupta", "Rao", "Singh", "Menon"];
const ROLES: User["role"][] = ["Admin", "Engineer", "Viewer"];

export const USERS: User[] = Array.from({ length: 200 }, (_, i) => {
  const first = FIRST[i % FIRST.length];
  const last = LAST[Math.floor(i / FIRST.length) % LAST.length];
  return {
    id: i + 1,
    name: `${first} ${last}`,
    email: `${first}.${last}${i}@example.com`.toLowerCase(),
    role: ROLES[i % 3],
    age: 21 + ((i * 7) % 40),
  };
});

const wait = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    const id = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });

export async function searchUsers(query: string, signal?: AbortSignal, latency = 100 + Math.random() * 400): Promise<User[]> {
  await wait(latency, signal);
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return USERS.filter((u) => u.name.toLowerCase().includes(q)).slice(0, 8);
}

export type Page<T> = { items: T[]; nextCursor: number | null; total: number };

export async function fetchUsersPage(cursor = 0, limit = 20, signal?: AbortSignal, latency = 300): Promise<Page<User>> {
  await wait(latency, signal);
  const items = USERS.slice(cursor, cursor + limit);
  const next = cursor + limit;
  return { items, nextCursor: next < USERS.length ? next : null, total: USERS.length };
}
