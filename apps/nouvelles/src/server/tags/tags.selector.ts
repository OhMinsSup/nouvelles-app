'server-only';
import { Prisma } from '@nouvelles/database';

export const selectByTag = Prisma.validator<Prisma.TagSelect>()({
  id: true,
  name: true,
  slug: true,
  _count: {
    select: {
      ItemTag: true,
    },
  },
});
