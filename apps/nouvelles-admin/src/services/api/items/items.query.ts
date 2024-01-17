import * as z from 'zod';

const _internalPaginationSchema = z.object({
  pageNo: z.number().nullable().optional().default(1),
  limit: z.number().nullable().optional().default(10),
});

export type PaginationInput = z.infer<typeof _internalPaginationSchema>;

const _internalSchema = z.object({});

export type BaseItemQueryInput = z.infer<typeof _internalSchema>;

export const schema = _internalSchema.extend(_internalPaginationSchema.shape);

export type ItemQueryInput = z.infer<typeof schema>;
