import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

import TrialNote from "@/components/roles/user/TrialNote";
import AdminOverview from "@/components/roles/admin/DashboardSummary";

export default async function HomeDashboardPage() {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;

  if (role === "admin") {
    return <AdminOverview />;
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
        {/* Later import subscriber module */}
      </div>
    );
  }

  return <div>❌ Unauthorized</div>;
}