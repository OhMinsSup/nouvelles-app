import NextAuth, { type NextAuthOptions } from 'next-auth';
import { authOptions } from '~/services/server/auth';

// Add back once NextAuth v5 is released
// export const runtime = 'edge';
const handlers = NextAuth(authOptions as unknown as NextAuthOptions);

export { handlers as GET, handlers as POST };
