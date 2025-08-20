import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      username?: string;
      role?: string;
      tenantId?: string; // ✅ Important for multi-tenant
      userId?: string; // Ensure userId is included
    };
  }

  interface User extends DefaultUser {
    username?: string;
    role?: string;
    tenantId?: string; // ✅ Added
    userId?: string; // Ensure userId is included
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string | null;
    email?: string | null;
    username?: string;
    role?: string;
    userId?: string; // Ensure userId is included
    tenantId?: string; // ✅ Add tenantId to JWT token
  }
}