import { createTRPCRouter, publicProcedure } from '~/libs/trpc/trpc-core';
import { tagsService } from '~/libs/trpc/router/tags/tags.server';
import { schema } from '~/libs/trpc/router/tags/tags.query';

export const tagsRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return tagsService.all(ctx);
  }),
  bySlug: publicProcedure.input(schema).query(({ input, ctx }) => {
    return tagsService.bySlug(ctx, input.slug);
  }),
});
