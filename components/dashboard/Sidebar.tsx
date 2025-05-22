"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { sidebarLinks } from "@/data/sidebarLinks"; // Adjust the import path as necessary
import Logout_Button from "@/app/dashboard/LogoutButton";

export default function Sidebar() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;

  const role = session?.user?.role || "user";

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen">
      {/* Sidebar Top (Logo & Links) */}
      <div className="p-4 flex-1">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          {sidebarLinks
            .filter((link) => link.roles.includes(role))
            .map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block px-4 py-2 rounded bg-gray-700 hover:bg-blue-600 hover:scale-[1.03] hover:shadow-md transition-all duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Sidebar Bottom (Logout Button) */}
      <div className="p-4 border-t border-gray-700">
        <Logout_Button />
      </div>
    </aside>
  );
}