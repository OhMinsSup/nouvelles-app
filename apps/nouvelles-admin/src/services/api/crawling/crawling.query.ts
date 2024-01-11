import * as z from 'zod';

const _internalSchema = z.object({});

export type BaseQueryInput = z.infer<typeof _internalSchema>;

export const schema = _internalSchema;

export type QueryInput = z.infer<typeof schema>;
