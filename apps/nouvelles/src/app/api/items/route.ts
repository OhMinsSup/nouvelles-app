import * as z from 'zod';
import { withAxiom, type AxiomRequest } from 'next-axiom';
import { itemService } from '~/server/items/items.server';
import { validateQuery } from '~/server/items/items.query';
import cors, { commonOriginFunc } from '~/server/utils/cors';
import { $logger } from '~/libs/logger/logger.server';

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
    const query = await validateQuery(request);

    const data = await itemService.getItems(query);

    return new Response(JSON.stringify(data), {
      headers: response.headers,
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const data = itemService.getDefaultItems();
      return new Response(JSON.stringify({ ...data, error }), {
        headers: response.headers,
        status: 400,
      });
    }

    $logger.error({
      error,
      message: '[GET - /api/items]: Error while fetching items',
      label: 'api',
      request,
    });

    return new Response(null, {
      headers: response.headers,
      status: 500,
    });
  }
};

export const GET = withAxiom(internalGet);
