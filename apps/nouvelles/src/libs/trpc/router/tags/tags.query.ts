import * as z from 'zod';

const _internalSchema = z.object({
  slug: z.string().min(1),
});

export type BaseTagsQueryInput = z.infer<typeof _internalSchema>;

export const schema = _internalSchema;

export type TagsQueryInput = z.infer<typeof schema>;
