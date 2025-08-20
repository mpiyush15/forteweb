import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";

// You may also store this client in `lib/db.ts` and import from there
const client = new MongoClient(process.env.MONGODB_URI as string);

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null;

        await client.connect();
        const db = client.db("forteStudioz");

        const user = await db.collection("users").findOne({
          username: credentials.username,
        });

        if (!user) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        // Return only required fields to session
        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role || "user",
          tenantId: user.tenantId || "default",
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.tenantId = user.tenantId;
        token.userId = user.id; // Ensure userId is included
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.tenantId = token.tenantId;
        session.user.userId = token.userId; // Ensure userId is included in session
        
      }
      return session;
    },
  },
};