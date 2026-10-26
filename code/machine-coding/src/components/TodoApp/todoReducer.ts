// Pure reducer → easy to unit test without rendering anything.
export type Todo = { id: string; text: string; done: boolean };
export type Filter = "all" | "active" | "done";

export type Action =
  | { type: "add"; text: string; id?: string }
  | { type: "toggle"; id: string }
  | { type: "edit"; id: string; text: string }
  | { type: "remove"; id: string }
  | { type: "clearDone" };

export function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case "add": {
      const text = action.text.trim();
      if (!text) return state;
      return [...state, { id: action.id ?? crypto.randomUUID(), text, done: false }];
    }
    case "toggle":
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case "edit":
      return state.map((t) => (t.id === action.id ? { ...t, text: action.text.trim() || t.text } : t));
    case "remove":
      return state.filter((t) => t.id !== action.id);
    case "clearDone":
      return state.filter((t) => !t.done);
    default: {
      const _never: never = action; // exhaustive check
      return _never;
    }
  }
}

export const applyFilter = (todos: Todo[], f: Filter) =>
  f === "all" ? todos : todos.filter((t) => (f === "done" ? t.done : !t.done));
