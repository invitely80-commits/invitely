import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { compare } from "bcryptjs";

import { prisma } from "@/lib/prisma";
import {
  ensureUserRecord,
  findUserByEmail,
  OAUTH_PASSWORD_PLACEHOLDER,
} from "@/lib/user-record";
import { signInSchema } from "@/lib/validations";

const devFallbackSecret = "invitely-dev-secret-change-me-before-production";
const configuredSecret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET;

const authSecret =
  process.env.NODE_ENV === "production"
    ? configuredSecret
    : configuredSecret
      ? [configuredSecret, devFallbackSecret]
      : devFallbackSecret;

const googleEnabled = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
);

if (process.env.NODE_ENV === "production" && !authSecret) {
  throw new Error("AUTH_SECRET is required in production.");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret: authSecret,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = signInSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const email = parsed.data.email.toLowerCase();
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        if (!user.passwordHash || user.passwordHash === OAUTH_PASSWORD_PLACEHOLDER) {
          return null;
        }

        const passwordMatches = await compare(parsed.data.password, user.passwordHash);

        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
    ...(googleEnabled
      ? [
          Google({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider !== "google") {
        return true;
      }

      const email = user.email?.toLowerCase();

      if (!email) {
        return false;
      }

      if (
        profile &&
        "email_verified" in profile &&
        typeof profile.email_verified === "boolean" &&
        !profile.email_verified
      ) {
        return false;
      }

      return true;
    },
    async jwt({ token, user, account }) {
      const email = user?.email ?? token.email;

      if (email) {
        try {
          let dbUser = await findUserByEmail(email);

          if (!dbUser && (account?.provider === "google" || user)) {
            dbUser = await ensureUserRecord(email, user?.name ?? token.name);
          }

          if (dbUser) {
            token.sub = dbUser.id;
            token.name = dbUser.name;
            token.email = dbUser.email;
            return token;
          }
        } catch (error) {
          console.error("Failed to hydrate JWT from app user record", error);
        }
      }

      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
});
