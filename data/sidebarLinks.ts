export const sidebarLinks = [
  {
    href: "/dashboard/home",
    label: "🏠 Home",
    roles: ["admin", "user"], // visible to all
  },
  {
    href: "/dashboard/lead",
    label: "📋 Leads",
    roles: ["admin"],
  },
  {
    href: "/dashboard/users",
    label: "👤 Users",
    roles: ["admin"],
  },
  {
    href: "/dashboard/subscriptions",
    label: "💳 Subscriptions",
    roles: ["admin"],
  },
  {
    href: "/dashboard/profile",
    label: "🧑‍💻 Profile",
    roles: ["user", "admin"],
  },
];