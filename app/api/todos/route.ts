import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Todo from "@/models/Todo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


// ========= GET =========
export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !("id" in session.user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const todos = await Todo.find({ userId: session.user.id });
  return NextResponse.json(todos);
}


// ========= POST =========
export async function POST(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !("id" in session.user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const todo = await Todo.create({
    ...body,
    userId: session.user.id,
  });

  return NextResponse.json(todo);
}


// ========= PUT =========
export async function PUT(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !("id" in session.user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  await Todo.findOneAndUpdate(
    { _id: body.id, userId: session.user.id },
    body
  );

  return NextResponse.json({ success: true });
}


// ========= DELETE =========
export async function DELETE(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !("id" in session.user)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();

  await Todo.findOneAndDelete({
    _id: id,
    userId: session.user.id,
  });

  return NextResponse.json({ success: true });
}
