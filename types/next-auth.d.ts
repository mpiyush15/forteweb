import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      username?: string;
      role?: string;
      tenantId?: string; // ✅ Important for multi-tenant
    };
  }

  interface User extends DefaultUser {
    username?: string;
    role?: string;
    tenantId?: string; // ✅ Added
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    name?: string | null;
    email?: string | null;
    username?: string;
    role?: string;
    tenantId?: string; // ✅ Add tenantId to JWT token
  }
}