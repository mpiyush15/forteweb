import { NextRequest, NextResponse } from "next/server";
import { hash } from "bcryptjs";
import clientPromise from "@/lib/db";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const client = await clientPromise;
  const db = client.db("forteStudioz");

  // Check if user exists
  const existingUser = await db.collection("users").findOne({ username });
  if (existingUser) {
    return NextResponse.json({ error: "Username already taken" }, { status: 400 });
  }

  const hashedPassword = await hash(password, 10);
  await db.collection("users").insertOne({ username, email, password: hashedPassword, role: "user", createdAt: new Date() });

  return NextResponse.json({ message: "User registered successfully" });
}