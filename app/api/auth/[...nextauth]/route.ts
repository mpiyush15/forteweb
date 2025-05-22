import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";
import type { SessionStrategy } from "next-auth"; // <-- Add this import
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
const client = new MongoClient(process.env.MONGODB_URI as string);

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await client.connect();
        const db = client.db("forteStudioz");
        const user = await db.collection("users").findOne({ username: credentials?.username });

        if (!user) return null;

        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) return null;

        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role || "user",
        };
      },
    }),
  ],
  session: { strategy: "jwt" as SessionStrategy }, // <-- Use double quotes and type assertion
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.username = user.username;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.user.username = token.username as string;
        session.user.role = token.role;
        session.user.name = token.username as string;
      }
      return session;
    },
  }
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };