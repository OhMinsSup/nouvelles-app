import * as z from 'zod';

const _internalPaginationSchema = z.object({
  cursor: z.number().nullable().optional(),
  limit: z.number().nullable().default(30).optional(),
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
