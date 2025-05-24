import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function UserProfilePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  // Only admins can access this page
  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  const client = await clientPromise;
  const db = client.db("forteStudioz");
  const user = await db.collection("users").findOne({ _id: new ObjectId(params.id) });

  if (!user) return <div className="p-6">❌ User not found.</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-4">👤 User Profile</h1>

      <div className="space-y-2">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Tenant ID:</strong> {user.tenantId}</p>
        <p><strong>Facebook:</strong> {user.facebook || "N/A"}</p>
        <p><strong>Instagram:</strong> {user.instagram || "N/A"}</p>
        <p><strong>WhatsApp:</strong> {user.whatsapp || "N/A"}</p>
        <p><strong>Subscribed:</strong> {user.subscribed ? "✅ Yes" : "❌ No"}</p>
        <p><strong>Plan:</strong> {user.plan || "free"}</p>
      </div>
    </div>
  );
}