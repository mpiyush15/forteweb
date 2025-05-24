// app/api/subscribe/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await clientPromise;
  const db = client.db("forteStudioz");

  const { plan } = await req.json(); // Plan sent from frontend

  // Update user role and subscription
  await db.collection("users").updateOne(
    { email: session.user.email },
    {
      $set: {
        role: "subscriber",
        plan: plan || "monthly",
        subscribed: true,
        subscribedAt: new Date(),
      },
    }
  );

  return NextResponse.json({ message: "Subscription successful" });
}