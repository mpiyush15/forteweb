// app/dashboard/users/[id]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { redirect } from "next/navigation";

interface UserProfilePageProps {
  params: { id: string };
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  const client = await clientPromise;
  const db = client.db("forteStudioz");

  const user = await db.collection("users").findOne({ _id: new ObjectId(params.id) });

  if (!user) {
    return <div className="p-6">❌ User not found.</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">👤 User Profile</h1>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Plan:</strong> {user.plan || "N/A"}</p>
      <p><strong>Subscribed:</strong> {user.subscribed ? "✅ Yes" : "❌ No"}</p>
      <p><strong>Facebook Page:</strong> {user.facebookPage || "N/A" }</p>
        <p><strong>Instagram Handle:</strong> {user.instagramHandle || "N/A"}</p>
    </div>
  );
}