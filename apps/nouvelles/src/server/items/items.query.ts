import * as z from 'zod';

const _internalPaginationSchema = z.object({
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
});

export type PaginationInput = z.infer<typeof _internalPaginationSchema>;

const _internalSchema = z.object({
  category: z.string().optional(),
  tag: z.string().optional(),
  type: z.enum(['root', 'search', 'today', 'tags', 'categories']).optional(),
  q: z.string().optional(),
});

export type BaseItemQueryInput = z.infer<typeof _internalSchema>;

export const schema = _internalSchema.extend(_internalPaginationSchema.shape);

export type ItemQueryInput = z.infer<typeof schema>;

export const validateQuery = async (request: Request) => {
  const { searchParams } = new URL(request.url);

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
