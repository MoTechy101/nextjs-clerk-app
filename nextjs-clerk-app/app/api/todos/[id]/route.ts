import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { todoStore } from "@/lib/todoStore";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// PATCH /api/todos/[id] - toggle completion or update text
export async function PATCH(request: Request, context: RouteContext) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const patch: { text?: string; completed?: boolean } = {};
  if (typeof body.text === "string") patch.text = body.text.trim();
  if (typeof body.completed === "boolean") patch.completed = body.completed;

  const updated = todoStore.update(userId, id, patch);
  if (!updated) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ todo: updated });
}

// DELETE /api/todos/[id] - remove a todo
export async function DELETE(_request: Request, context: RouteContext) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const ok = todoStore.remove(userId, id);
  if (!ok) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
