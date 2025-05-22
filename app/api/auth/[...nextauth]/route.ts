import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";



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
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
 callbacks: {
  async jwt({ token, user }: { token: any; user?: any }) {
    if (user) {
      token.username = user.username;
      token.role = user.role;
    }
    return token;
  },
  async session({ session, token }: { session: any; token: any }) {
    if (token) {
      session.user.username = token.username;
      session.user.role = token.role;
      session.user.name = token.username;
    }
    return session;
  },
}
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };