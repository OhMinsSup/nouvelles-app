"server-only";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import { getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import Kakao from "next-auth/providers/kakao";

import { db } from "apps/nouvelles/src/server/db/prisma";
import { env } from "../../../env.mjs/index.js";

// Define a role enum
export enum Role {
  user = "user",
  admin = "admin",
}

export type SessionUser = {
  id: string;
  name: string | undefined;
  email: string | undefined;
  image: string | undefined;
  role?: Role;
};

export type SessionData = {
  user: SessionUser;
};

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: SessionUser;
  }
}

export const authOptions = {
  providers: [
    Kakao({
      clientId: env.KAKAO_CLIENT_ID,
      clientSecret: env.KAKAO_CLIENT_SECRET,
      profile: (profile) => {
        return {
          id: profile.id.toString(),
          name: profile.kakao_account?.profile?.nickname,
          email: profile.kakao_account?.email,
          image: profile.kakao_account?.profile?.profile_image_url,
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/admin/signin",
    verifyRequest: "/admin/signin",
    error: "/admin/signin", // Error code passed in query string as ?error=
  },
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user = {
          ...(session.user ?? {}),
          id: user.id,
          // @ts-ignore TODO: fix this
          role: user.role,
        };
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export function getSession() {
  return getServerSession(authOptions) as Promise<SessionData | null>;
}

export const isAuthorized = <T extends SessionData>(
  session: T | null,
  role?: Role
): session is T => {
  if (!session) {
    return false;
  }

  if (!session.user) {
    return false;
  }

  if (!session.user.id) {
    return false;
  }

  if (role && session.user.role !== role) {
    return false;
  }

  return true;
};
