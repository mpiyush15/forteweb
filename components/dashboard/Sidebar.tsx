"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { sidebarLinks } from "@/data/sidebarLinks";
import Logout_Button from "@/app/dashboard/LogoutButton";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { data: session, status } = useSession();
  const role = session?.user?.role || "user";

  if (status === "loading") return null;

  return (
    <aside
      className={`fixed md:static w-64 h-screen bg-gray-800 text-white z-40 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Close button (Mobile Only) */}
      <div className="md:hidden flex justify-end p-4">
        <button onClick={onClose} className="text-xl">✕</button>
      </div>

      {/* Sidebar Content */}
      <div className="p-4 space-y-6">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <ul className="space-y-2">
          {sidebarLinks
            .filter((link) => link.roles.includes(role))
            .map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block px-4 py-2 rounded bg-gray-700 hover:bg-blue-600 transition-all"
                >
                  {link.label}
                </Link>
              </li>
            ))}
        </ul>
      </div>

      {/* Logout Button at bottom */}
      <div className="p-4 mt-auto border-t border-gray-700">
        <Logout_Button />
      </div>
    </aside>
  );
}