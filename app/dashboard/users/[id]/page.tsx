import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import type { Session } from "next-auth";

type Props = {
  params: {
    id: string;
  };
};

export default async function UserProfilePage({ params }: Props) {
  const session: Session | null = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/unauthorized");
  }

  const client = await clientPromise;
  const db = client.db("forteStudioz");

  const user = await db.collection("users").findOne({ _id: new ObjectId(params.id) });

  if (!user) {
    return <div className="p-6 text-red-600">❌ User not found</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">👤 User Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Plan:</strong> {user.plan || "-"}</p>
      <p><strong>Subscribed:</strong> {user.subscribed ? "✅ Yes" : "❌ No"}</p>
    </div>
  );
}