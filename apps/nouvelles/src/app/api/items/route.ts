import { NextResponse } from 'next/server';
import { withAxiom, type AxiomRequest } from 'next-axiom';
import { schema } from '~/services/api/items/items.query';
import { itemService } from '~/services/api/items/items.server';
import cors, { commonOriginFunc } from '~/services/server/utils/cors';
import { env } from 'env.mjs';
import { logger } from '~/services/logger/logger';

const getParsedQuery = (searchParams: URLSearchParams) => {
  return {
    cursor: searchParams.get('cursor')
      ? Number(searchParams.get('cursor'))
      : undefined,
    limit: searchParams.get('limit')
      ? Number(searchParams.get('limit'))
      : undefined,
    type: searchParams.get('type') ?? undefined,
    category: searchParams.get('category') ?? undefined,
    tag: searchParams.get('tag') ?? undefined,
    q: searchParams.get('q') ?? undefined,
  };
};

const internalGet = async (request: AxiomRequest) => {
  const response = await cors(request, new Response(), {
    origin: commonOriginFunc,
    methods: ['GET', 'HEAD', 'OPTIONS'],
    credentials: true,
  });

  if (response.status === 204) {
    return response;
  }

  if (!response.headers.has('Access-Control-Allow-Origin')) {
    return response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const query = schema.safeParse(getParsedQuery(searchParams));
    if (!query.success) {
      logger.error('Error while parsing query', {
        type: 'http',
        error: query.error,
        url: request.url,
      });
      return itemService.getDefaultItems();
    }
    const data = await itemService.all(query.data);
    return NextResponse.json(data);
  } catch (error) {
    if (env.NODE_ENV === 'production') {
      request.log.error('Error while getting items', {
        error,
        url: request.url,
      });
    } else {
      logger.error('Error while getting items', {
        type: 'http',
        error,
        url: request.url,
      });
    }
    return new Response(null, { status: 500 });
  }
};

export const GET = withAxiom(internalGet);
