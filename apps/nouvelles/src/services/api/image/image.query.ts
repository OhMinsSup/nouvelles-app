import * as z from 'zod';

const _internalSchema = z.object({
  url: z.string().min(1),
});

export type BaseImageQueryInput = z.infer<typeof _internalSchema>;

export const schema = _internalSchema;

export type ImageQueryInput = z.infer<typeof schema>;
