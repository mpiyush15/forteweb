import AnalyticsCard from "@/components/dashboard/home/AnalyticsCard";
import clientPromise from "@/lib/db";

export default async function HomeDashboardPage() {
  const client = await clientPromise;
  const db = client.db("forteStudioz");

  const userCount = await db.collection("users").countDocuments();
  const leadCount = await db.collection("lead").countDocuments();
  const courseCount = await db.collection("subscriptions").countDocuments(); // if exists
  const revenue = 12000; // placeholder, you can calculate from payments

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">📊 Reports</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <AnalyticsCard label="Total Users" value={userCount} icon="👤" />
        <AnalyticsCard label="Total Leads" value={leadCount} icon="📋" />
        <AnalyticsCard label="Subscription Plans" value={courseCount || 0} icon="🎓" />
        <AnalyticsCard label="Revenue" value={`₹${revenue}`} icon="💰" />
      </div>
    </div>
  );
}