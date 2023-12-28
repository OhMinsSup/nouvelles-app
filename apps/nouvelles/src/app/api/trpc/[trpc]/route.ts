import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter, createTRPCContext } from '~/libs/trpc/trpc-root';
import cors, { commonOriginFunc } from '~/server/utils/cors';

const handler = async (request: Request) => {
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req: request,
    createContext: () =>
      createTRPCContext({
        session: null,
        headers: request.headers,
      }),
    onError({ error, path }) {
      console.error(`>>> tRPC Error on '${path}'`, error);
    },
  });

  const responseNext = await cors(request, response, {
    origin: commonOriginFunc,
    credentials: true,
  });

  return responseNext;
};

export { handler as GET, handler as POST };
