import * as z from 'zod';
import { itemService } from '~/server/items/items.server';
import { validateQuery } from '~/server/items/items.query';
import cors, { commonOriginFunc } from '~/server/utils/cors';

export async function GET(request: Request) {
  const response = await cors(request, new Response(), {
    origin: commonOriginFunc,
    methods: ['GET', 'HEAD', 'OPTIONS'],
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
      ...response,
      status: 200,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const data = itemService.getDefaultItems();
      return new Response(JSON.stringify({ ...data, error }), {
        ...response,
        status: 400,
      });
    }

    return new Response(null, {
      ...response,
      status: 500,
    });
  }
}
