import { createTRPCRouter, publicProcedure } from '~/libs/trpc/trpc-core';
import { schema } from '~/libs/trpc/router/items/items.query';
import { itemService } from '~/libs/trpc/router/items/items.server';

export const itemsRouter = createTRPCRouter({
  all: publicProcedure.input(schema).query(({ input, ctx }) => {
    return itemService.all(ctx, input);
  }),
});
