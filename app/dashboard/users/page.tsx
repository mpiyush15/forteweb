/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import clientPromise from "@/lib/db";

export default async function AdminUsersPage() {
  // 🔐 Server-side session check
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await getServerSession(authOptions as any);

  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized"); // 🚫 Redirect if not admin
  }

  const client = await clientPromise;
  const db = client.db("forteStudioz");
  const users = await db.collection("users").find().sort({ createdAt: -1 }).toArray();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">👥 All Users</h1>
      <table className="w-full border border-gray-300 rounded">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Username</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Plan</th>
            <th className="p-2">Subscribed</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="p-2">{user.username}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2 font-medium text-blue-600">{user.role}</td>
              <td className="p-2">{user.plan || "-"}</td>
              <td className="p-2">{user.subscribed ? "✅ Yes" : "❌ No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}