import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import type { JWT } from "next-auth/jwt";
import type { Session, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string | null;
    user: DefaultSession["user"] & {
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    provider?: string;
    providerAccountId?: string;
  }
}

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const appleClientId = process.env.APPLE_CLIENT_ID;
const appleClientSecret = process.env.APPLE_CLIENT_SECRET;
const facebookClientId = process.env.FACEBOOK_CLIENT_ID;
const facebookClientSecret = process.env.FACEBOOK_CLIENT_SECRET;
const instagramClientId = process.env.INSTAGRAM_CLIENT_ID;
const instagramClientSecret = process.env.INSTAGRAM_CLIENT_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: googleClientId as string,
      clientSecret: googleClientSecret as string,
    }),
    FacebookProvider({
      clientId: facebookClientId as string,
      clientSecret: facebookClientSecret as string,
    }),
    AppleProvider({
      clientId: appleClientId as string,
      clientSecret: appleClientSecret as string,
    }),
    {
      id: "instagram",
      name: "Instagram",
      type: "oauth" as const,
      version: "2.0",
      params: {
        scope: "user_profile,user_media",
      },
      accessTokenUrl: "https://api.instagram.com/oauth/access_token",
      authorizationUrl: { url: "https://api.instagram.com/oauth/authorize" },
      profileUrl: "https://graph.instagram.com/me?fields=id,username&access_token=${accessToken}",
      profile(profile: { id: string; username: string }) {
        return {
          id: profile.id,
          name: profile.username,
          email: null,
          image: `https://graph.instagram.com/${profile.id}/picture?access_token=${(globalThis as any).__access_token || ''}`,
        };
      },
      clientId: instagramClientId as string,
      clientSecret: instagramClientSecret as string,
    },
  ],
  jwt: {
    secret: nextAuthSecret as string,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: {
      user: any;
      account: any;
      profile?: any;
      email?: any;
      credentials?: any;
    }) {
      return true;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken ?? null;
      session.user = {
        ...session.user,
        id: token.sub ?? "",
      };
      return session;
    },
    async jwt({ token, user, account }: {
      token: JWT;
      user?: any;
      account?: any;
    }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        token.providerAccountId = account.providerAccountId;
      }
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: nextAuthSecret as string,
};

export default NextAuth(authOptions);