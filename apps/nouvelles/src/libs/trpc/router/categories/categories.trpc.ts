import { createTRPCRouter, publicProcedure } from '~/libs/trpc/trpc-core';
import { categoriesService } from '~/libs/trpc/router/categories/categories.server';
import { schema } from '~/libs/trpc/router/categories/categories.query';

export const categoriesRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    return categoriesService.all(ctx);
  }),
  bySlug: publicProcedure.input(schema).query(({ input, ctx }) => {
    return categoriesService.bySlug(ctx, input.slug);
  }),
});
