import { createTRPCRouter } from '~/libs/trpc/trpc-core';
import { itemsRouter } from '~/libs/trpc/router/items/items.tpc';
import { tagsRouter } from '~/libs/trpc/router/tags/tags.trpc';
import { categoriesRouter } from '~/libs/trpc/router/categories/categories.trpc';

export const appRouter = createTRPCRouter({
  items: itemsRouter,
  tags: tagsRouter,
  categories: categoriesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
