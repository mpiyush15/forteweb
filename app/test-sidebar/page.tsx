import Sidebar from "@/components/dashboard/Sidebar";

export default function TestSidebarPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Test Sidebar Page</h1>
        <p>This is a dummy page to test your Sidebar component layout and links.</p>
      </div>
    </div>
  );
}