'server-only';
import type {
  NextAuthOptions as NextAuthConfig,
  DefaultUser,
  DefaultSession,
} from 'next-auth';
import { getServerSession } from 'next-auth';
import { db } from '@nouvelles/database';
import { PrismaAdapter } from '@auth/prisma-adapter';
import Kakao from 'next-auth/providers/kakao';
import { env } from 'env.mjs';
import { API_ENDPOINTS } from '~/constants/constants';

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string;
    username?: string | null;
    role?: string | null;
    createdAt: string;
    updatedAt: string;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession['user'] & User;
  }
}

export const authOptions = {
  secret: env.NEXTAUTH_SECRET,
  providers: [
    Kakao({
      clientId: env.KAKAO_CLIENT_ID,
      clientSecret: env.KAKAO_CLIENT_SECRET,
      profile(profile) {
        const id = profile.id.toString();
        const searchParams = new URLSearchParams();
        searchParams.append('seed', id);
        return {
          id,
          name: profile.kakao_account?.profile?.nickname,
          email: profile.kakao_account?.email,
          image: API_ENDPOINTS.avatar(searchParams),
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/signin',
    error: '/auth/signin', // Error code passed in query string as ?error=
  },
  callbacks: {
    session: ({ session, user }) => {
      if (session.user !== undefined) {
        session.user.id = user?.id;
        session.user.username = user?.username;
      }
      return session;
    },
  },
  // @ts-expect-error prisma adapter
  adapter: PrismaAdapter(db),
} satisfies NextAuthConfig;

export function getSession() {
  // @ts-expect-error rsc authOptions
  return getServerSession(authOptions);
}

export type NotNull<T> = T extends null ? never : T;

export type Session = NotNull<Awaited<ReturnType<typeof getSession>>>;
