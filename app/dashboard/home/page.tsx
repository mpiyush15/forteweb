import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import clientPromise from "@/lib/db";

import AnalyticsCard from "@/components/dashboard/home/AnalyticsCard";
import TrialNote from "@/components/roles/user/TrialNote"; // optional

export default async function HomeDashboardPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  const client = await clientPromise;
  const db = client.db("forteStudioz");

  if (role === "admin") {
    const userCount = await db.collection("users").countDocuments();
    const leadCount = await db.collection("lead").countDocuments();
    const courseCount = await db.collection("subscriptions").countDocuments();
    const revenue = 12000; // Placeholder

    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">📊 Admin Reports</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <AnalyticsCard label="Total Users" value={userCount} icon="👤" />
          <AnalyticsCard label="Total Leads" value={leadCount} icon="📋" />
          <AnalyticsCard label="Subscription Plans" value={courseCount || 0} icon="🎓" />
          <AnalyticsCard label="Revenue" value={`₹${revenue}`} icon="💰" />
        </div>
      </div>
    );
  }

  if (role === "user") {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">👋 Welcome to Forte Studioz</h1>
        <TrialNote />
      </div>
    );
  }

  if (role === "subscriber") {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">🎉 Welcome Back, Subscriber!</h1>
        
      </div>
      
    );
  }

  return <div>❌ Unauthorized</div>;
}