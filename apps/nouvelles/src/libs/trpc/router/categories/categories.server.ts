'server-only';
import { selectByCategory } from '~/libs/trpc/router/categories/categories.selector';
import type { TRPCContext } from '~/libs/trpc/trpc-root';

export class CategoriesService {
  all(ctx: TRPCContext) {
    return ctx.db.category.findMany({
      select: selectByCategory,
    });
  }

  bySlug(ctx: TRPCContext, slug: string) {
    return ctx.db.category.findUnique({
      where: {
        slug,
      },
      select: selectByCategory,
    });
  }
}

export const categoriesService = new CategoriesService();
