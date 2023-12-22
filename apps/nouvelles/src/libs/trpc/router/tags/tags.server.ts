'server-only';
import type { TRPCContext } from '~/libs/trpc/trpc-root';
import { selectByTag } from '~/libs/trpc/router/tags/tags.selector';

export class TagsService {
  all(ctx: TRPCContext) {
    return ctx.db.tag.findMany({
      select: selectByTag,
    });
  }

  bySlug(ctx: TRPCContext, slug: string) {
    return ctx.db.tag.findUnique({
      where: {
        slug,
      },
      select: selectByTag,
    });
  }
}

export const tagsService = new TagsService();
