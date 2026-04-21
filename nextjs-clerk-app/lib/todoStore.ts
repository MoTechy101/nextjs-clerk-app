// Simple in-memory data store keyed by Clerk userId.
// In production, replace this with a real database (Postgres via Prisma,
// Supabase, Convex, Neon, etc.).

export type Todo = {
  id: string;
  userId: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

// Module-level Map persists for the lifetime of the server process
const todosByUser = new Map<string, Todo[]>();

export const todoStore = {
  list(userId: string): Todo[] {
    return todosByUser.get(userId) ?? [];
  },

  create(userId: string, text: string): Todo {
    const todo: Todo = {
      id: crypto.randomUUID(),
      userId,
      text,
      completed: false,
      createdAt: Date.now(),
    };
    const existing = todosByUser.get(userId) ?? [];
    todosByUser.set(userId, [todo, ...existing]);
    return todo;
  },

  update(
    userId: string,
    id: string,
    patch: Partial<Pick<Todo, "text" | "completed">>
  ): Todo | null {
    const list = todosByUser.get(userId) ?? [];
    const idx = list.findIndex((t) => t.id === id);
    if (idx === -1) return null;
    const updated = { ...list[idx], ...patch };
    list[idx] = updated;
    todosByUser.set(userId, list);
    return updated;
  },

  remove(userId: string, id: string): boolean {
    const list = todosByUser.get(userId) ?? [];
    const next = list.filter((t) => t.id !== id);
    if (next.length === list.length) return false;
    todosByUser.set(userId, next);
    return true;
  },
};
