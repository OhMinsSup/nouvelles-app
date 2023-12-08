import { NextResponse } from 'next/server';
// import { getSession } from '~/server/auth';
import { itemService } from '~/server/items/items.server';
import * as z from 'zod';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

const searchParamsSchema = z.object({
  cursor: z.string().optional(),
  limit: z.string().optional(),
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
    console.log('error', error);
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

    if (error instanceof PrismaClientValidationError) {
      const err = {
        code: 'database_validation_error',
        message: 'Database validation error',
        errors: [],
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
