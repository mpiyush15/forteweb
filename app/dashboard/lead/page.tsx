import clientPromise from "@/lib/db";

export default async function AdminLeadsPage() {
  const client = await clientPromise; //Wait for MongoDB to be connected before doing anything
  const db = client.db("forteStudioz"); //match the name in your MongoDB Atlas
  const leads = await db.collection("lead").find().sort({ createdAt: -1 }).toArray();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 Leads Submitted</h1>
      <table className="w-full text-left border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Institute</th>
            <th className="p-2 border">Plan</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead: any) => (
            <tr key={lead._id}>
              <td className="p-2 border">{lead.name}</td>
              <td className="p-2 border">{lead.email}</td>
              <td className="p-2 border">{lead.phone}</td>
              <td className="p-2 border">{lead.institute}</td>
              <td className="p-2 border">{lead.plan}</td>
              <td className="p-2 border">{new Date(lead.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}