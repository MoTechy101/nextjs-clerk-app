import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { todoStore } from "@/lib/todoStore";

// GET /api/todos - list current user's todos
export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todos = todoStore.list(userId);
  return NextResponse.json({ todos });
}

// POST /api/todos - create a new todo
export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const text = body?.text;

  if (typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json(
      { error: "Todo text is required" },
      { status: 400 }
    );
  }

  if (text.length > 500) {
    return NextResponse.json(
      { error: "Todo text must be under 500 characters" },
      { status: 400 }
    );
  }

  const todo = todoStore.create(userId, text.trim());
  return NextResponse.json({ todo }, { status: 201 });
}
