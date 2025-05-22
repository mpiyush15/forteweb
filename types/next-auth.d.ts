import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      username?: string;
      role?: string;
    };
  }

  interface User extends DefaultUser {
    username?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
    role?: string;
  }
}