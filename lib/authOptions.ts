import type { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";

const client = new MongoClient(process.env.MONGODB_URI as string);

export const authOptions: AuthOptions = {
  providers: [
    // Existing Credentials Provider
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

        return {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role || "user",
          tenantId: user.tenantId || "default",
        };
      },
    }),

    // NEW: Facebook Business Provider (Unified for WhatsApp + Ads)
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      authorization: {
        params: {
          scope: [
            'public_profile',
            'email',
            'business_management',
            'ads_management',
            'ads_read',
            'whatsapp_business_management',
            'whatsapp_business_messaging',
          ].join(','),
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user, account }) {
      // Existing credentials logic
      if (user) {
        token.username = user.username;
        token.role = user.role;
        token.tenantId = user.tenantId;
        token.userId = user.id;
      }
      
      // NEW: Handle Facebook Business connection
      if (account?.provider === "facebook") {
        token.facebookAccessToken = account.access_token;
        token.facebookUserId = account.providerAccountId;
        token.facebookPermissions = account.scope?.split(',') || [];
        token.facebookTokenExpiry = account.expires_at;
      }
      
      return token;
    },

    async session({ session, token }) {
      // Existing session data
      if (token) {
        session.user.username = token.username;
        session.user.role = token.role;
        session.user.tenantId = token.tenantId;
        session.user.userId = token.userId;
        
        // NEW: Add Facebook Business data to session
        session.facebookAccessToken = token.facebookAccessToken;
        session.facebookUserId = token.facebookUserId;
        session.facebookPermissions = token.facebookPermissions;
        
        // Check which modules are available
        session.hasWhatsAppAccess = token.facebookPermissions?.includes('whatsapp_business_messaging');
        session.hasAdsAccess = token.facebookPermissions?.includes('ads_management');
      }
      return session;
    },

    // NEW: Handle Facebook Business account linking
    async signIn({ user, account, profile }) {
      if (account?.provider === "facebook") {
        await client.connect();
        const db = client.db("forteStudioz");
        
        // Link Facebook Business to existing tenant
        // This assumes user is already logged in with credentials
        // We'll handle this flow in the UI
        
        return true;
      }
      return true;
    },
  },

  pages: {
    signIn: '/login',
  },
};
