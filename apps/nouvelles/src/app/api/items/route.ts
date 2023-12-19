import { NextResponse } from 'next/server';
import * as z from 'zod';
import { env } from 'env.mjs';
import { itemService } from '~/server/items/items.server';
import cors from '~/server/utils/cors';

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
  // 개발일 때는 * 로 허용 배포일 때는 특정 도메인만 허용
  if (env.NODE_ENV === 'development') {
    return '*';
  }

  if (!origin) {
    return false;
  }

  // nouvelles-*.vercel.app
  const allowedOriginsRegex = [
    /^https?:\/\/nouvelles-.*\.vercel\.app$/,
    /^https?:\/\/nouvelles\.vercel\.app$/,
  ];

  return allowedOriginsRegex.some((regex) => regex.test(origin));
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const defaultValues = itemService.getDefaultItems();

  try {
    const query = await validateQuery(searchParams);

    const data = await itemService.getItems(query);
    return cors(
      request,
      NextResponse.json({
        ...data,
        error: null,
      }),
      {
        origin: originFn,
      },
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const err = {
        code: 'invalid_query_params',
        message: 'Invalid query params',
        errors: error.issues,
      };

      return cors(
        request,
        NextResponse.json(
          {
            ...defaultValues,
            error: err,
          },
          { status: 400 },
        ),
        {
          origin: originFn,
        },
      );
    }

    return cors(
      request,
      NextResponse.json(
        {
          ...defaultValues,
          error: {
            code: 'unknown_error',
            message: 'Unknown error',
            errors: [],
          },
        },
        { status: 500 },
      ),
      {
        origin: originFn,
      },
    );
  }
}
