import { NextResponse } from 'next/server';
import * as z from 'zod';
import { itemService } from '~/server/items/items.server';

const searchParamsSchema = z.object({
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
  type: z.enum(['root', 'search', 'today']).optional(),
  q: z.string().optional(),
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = await searchParamsSchema.parseAsync({
      cursor: searchParams.get('cursor') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      type: searchParams.get('type') ?? undefined,
      category: searchParams.get('category') ?? undefined,
      tag: searchParams.get('tag') ?? undefined,
      q: searchParams.get('q') ?? undefined,
    });

    const data = await itemService.getItems(query);
    return NextResponse.json({
      ...data,
      error: null,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const err = {
        code: 'invalid_query_params',
        message: 'Invalid query params',
        errors: error.issues,
      };

      const defaultValues = itemService.getDefaultItems();
      return NextResponse.json(
        {
          ...defaultValues,
          error: err,
        },
        { status: 400 },
      );
    }

    return new Response(null, { status: 500 });
  }
}
