"server-only";
import type { NextAuthOptions as NextAuthConfig } from "next-auth";
import { getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import Kakao from "next-auth/providers/kakao";

import { db } from "~/server/db/prisma";
import { env } from "../../../env.mjs";

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth/jwt" {
  interface JWT {
    /** The user's role. */
    user: {
      id: string;
      name: string | undefined;
      username: string;
      email: string | undefined;
      emailVerified: boolean;
      image: string | undefined;
      profile: {
        bio: string | undefined;
      };
      isActive: boolean;
    };
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name: string | undefined;
      username: string;
      email: string | undefined;
      emailVerified: boolean;
      image: string | undefined;
      profile: {
        bio: string | undefined;
      };
    };
  }
}

export const authOptions = {
  providers: [
    Kakao({
      clientId: env.KAKAO_CLIENT_ID,
      clientSecret: env.KAKAO_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/signin",
    verifyRequest: "/signin",
    error: "/signin", // Error code passed in query string as ?error=
  },
  adapter: PrismaAdapter(db),
} satisfies NextAuthConfig;

export function getSession() {
  return getServerSession(authOptions) as Promise<{
    user: {
      id: string;
      name: string | undefined;
      username: string;
      email: string | undefined;
      emailVerified: boolean;
      image: string | undefined;
      profile: {
        bio: string | undefined;
      };
      isActive: boolean;
    };
  } | null>;
}
