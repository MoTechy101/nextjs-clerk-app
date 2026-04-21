"use client";

import { useState, useTransition } from "react";
import type { Todo } from "@/lib/todoStore";

export default function TodoList({ initialTodos }: { initialTodos: Todo[] }) {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const text = newTodo.trim();
    if (!text) return;

    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch("/api/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });
        if (!res.ok) throw new Error((await res.json()).error ?? "Failed");
        const { todo } = (await res.json()) as { todo: Todo };
        setTodos((prev) => [todo, ...prev]);
        setNewTodo("");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    });
  }

  async function handleToggle(todo: Todo) {
    // Optimistic update
    setTodos((prev) =>
      prev.map((t) =>
        t.id === todo.id ? { ...t, completed: !t.completed } : t
      )
    );
    try {
      await fetch(`/api/todos/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
    } catch {
      // Revert on failure
      setTodos((prev) =>
        prev.map((t) =>
          t.id === todo.id ? { ...t, completed: todo.completed } : t
        )
      );
    }
  }

  async function handleDelete(id: string) {
    const snapshot = todos;
    setTodos((prev) => prev.filter((t) => t.id !== id));
    try {
      const res = await fetch(`/api/todos/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      setTodos(snapshot);
    }
  }

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="What needs to be done?"
          maxLength={500}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending || !newTodo.trim()}
          className="rounded-lg bg-indigo-600 px-5 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add
        </button>
      </form>

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6">
        {todos.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-500">
            No todos yet. Add your first one above!
          </p>
        ) : (
          <ul className="divide-y divide-slate-200">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 py-3"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
                  className="h-5 w-5 cursor-pointer rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span
                  className={`flex-1 ${
                    todo.completed
                      ? "text-slate-400 line-through"
                      : "text-slate-900"
                  }`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => handleDelete(todo.id)}
                  className="rounded-md px-2 py-1 text-sm text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                  aria-label="Delete todo"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {todos.length > 0 && (
        <div className="mt-4 border-t border-slate-200 pt-4 text-sm text-slate-500">
          {remaining} {remaining === 1 ? "task" : "tasks"} remaining
        </div>
      )}
    </div>
  );
}
