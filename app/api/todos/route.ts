import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Todo from "../../../models/Todo";

export async function GET() {
  await connectDB();
  const todos = await Todo.find();
  return NextResponse.json(todos);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();

  const newTodo = await Todo.create(body);

  return NextResponse.json(newTodo);
}

export async function PUT(req: Request) {
  await connectDB();
  const body = await req.json();

  await Todo.findByIdAndUpdate(body.id, body);

  return NextResponse.json({ success: true });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();

  await Todo.findByIdAndDelete(id);

  return NextResponse.json({ success: true });
}
