import { NextResponse } from 'next/server';
import * as z from 'zod';
import { env } from 'env.mjs';
import { itemService } from '~/server/items/items.server';
import cors from '~/server/utils/cors';
import logger from '~/utils/logger';

const schema = z.object({
  cursor: z
    .string()
    .optional()
    .transform((val) => {
      if (val === 'undefined') {
        return undefined;
      }

      if (typeof val === 'string') {
        return parseInt(val, 10);
      }

      return val as unknown as number;
    }),
  limit: z
    .string()
    .optional()
    .default('25')
    .transform((val) => {
      if (val === 'undefined') {
        return undefined;
      }

      if (typeof val === 'string') {
        return parseInt(val, 10);
      }

      return val as unknown as number;
    }),
  category: z.string().optional(),
  tag: z.string().optional(),
  type: z.enum(['root', 'search', 'today', 'tags', 'categories']).optional(),
  q: z.string().optional(),
});

const validateQuery = async (searchParams: URLSearchParams) => {
  const input = {
    cursor: searchParams.get('cursor') ?? undefined,
    limit: searchParams.get('limit') ?? undefined,
    type: searchParams.get('type') ?? undefined,
    category: searchParams.get('category') ?? undefined,
    tag: searchParams.get('tag') ?? undefined,
    q: searchParams.get('q') ?? undefined,
  };

  return schema.parseAsync(input);
};

const originFn = (origin: string | undefined) => {
  logger.info('server', 'cors:origin', {
    origin,
  });

  // nouvelles-*.vercel.app
  const corsWhitelist: RegExp[] = [
    /^https?:\/\/nouvelles-.*\.vercel\.app$/,
    /^https?:\/\/nouvelles\.vercel\.app$/,
  ];

  if (env.NODE_ENV === 'development') {
    corsWhitelist.push(/^http:\/\/localhost/);
  }

  if (origin) {
    logger.info('server', 'cors:allowedOriginsRegex', {
      allowed: corsWhitelist.some((regex) => regex.test(origin)),
    });

    for (const regex of corsWhitelist) {
      logger.info('server', 'cors:regex', {
        regex: regex.toString(),
        test: regex.test(origin),
      });
    }
  }

  if (!origin || corsWhitelist.some((regex) => regex.test(origin))) {
    return true;
  }

  return false;
};

export async function GET(request: Request) {
  const resposne = await cors(
    request,
    new NextResponse(null, {
      status: 401,
    }),
    {
      origin: originFn,
      credentials: true,
    },
  );

  if (resposne.status === 401) {
    return resposne;
  }

  const { searchParams } = new URL(request.url);

  const defaultValues = itemService.getDefaultItems();

  try {
    const query = await validateQuery(searchParams);

    const data = await itemService.getItems(query);

    return new NextResponse(
      JSON.stringify({
        ...data,
        error: null,
      }),
      {
        ...resposne,
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const err = {
        code: 'invalid_query_params',
        message: 'Invalid query params',
        errors: error.issues,
      };

      return new NextResponse(
        JSON.stringify({
          ...defaultValues,
          error: err,
        }),
        {
          ...resposne,
          status: 400,
        },
      );
    }

    return new NextResponse(
      JSON.stringify({
        ...defaultValues,
        error: {
          code: 'unknown_error',
          message: 'Unknown error',
          errors: [],
        },
      }),
      {
        ...resposne,
        status: 500,
      },
    );
  }
}
