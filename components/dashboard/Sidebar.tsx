"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { sidebarLinks } from "@/data/sidebarLinks";
import Logout_Button from "@/app/dashboard/LogoutButton";

export default function Sidebar() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState<string | null>(null);

  if (status === "loading") return null;

  const role = session?.user?.role || "user";

  const toggleSubmenu = (label: string) => {
    setOpen((prev) => (prev === label ? null : label));
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col h-screen">
      {/* Top */}
      <div className="p-4 flex-1">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul className="space-y-2">
          {sidebarLinks
            .filter((link) => link.roles.includes(role))
            .map((link) => (
              <li key={link.label}>
                {link.children ? (
                  <div>
                    <button
                      onClick={() => toggleSubmenu(link.label)}
                      className="w-full text-left px-4 py-2 rounded bg-gray-700 hover:bg-blue-600 transition-all"
                    >
                      {link.label}
                      <span className="float-right">
                        {open === link.label ? "▲" : "▼"}
                      </span>
                    </button>
                    {open === link.label && (
                      <ul className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block px-3 py-1 rounded bg-gray-700 hover:bg-blue-600 text-sm transition-all"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block px-4 py-2 rounded bg-gray-700 hover:bg-blue-600 hover:scale-[1.03] hover:shadow-md transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
        </ul>
      </div>

      {/* Bottom */}
      <div className="p-4 border-t border-gray-700">
        <Logout_Button />
      </div>
    </aside>
  );
}