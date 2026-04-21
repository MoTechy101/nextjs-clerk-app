import { currentUser } from "@clerk/nextjs/server";
import { todoStore } from "@/lib/todoStore";
import TodoList from "@/components/TodoList";

export default async function DashboardPage() {
  // Middleware already guarantees the user is authenticated,
  // but we call currentUser() for the profile data.
  const user = await currentUser();

  // Safe because middleware blocks unauthenticated requests.
  const initialTodos = user ? todoStore.list(user.id) : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Welcome back, {user?.firstName ?? "friend"} 👋
        </h1>
        <p className="mt-2 text-slate-600">
          Signed in as{" "}
          <span className="font-medium">
            {user?.emailAddresses[0]?.emailAddress}
          </span>
        </p>
      </div>

      <TodoList initialTodos={initialTodos} />
    </div>
  );
}
