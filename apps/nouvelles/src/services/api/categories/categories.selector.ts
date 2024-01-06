'server-only';
import { Prisma } from '@nouvelles/database';

export const selectByCategory = Prisma.validator<Prisma.CategorySelect>()({
  id: true,
  name: true,
  slug: true,
  _count: {
    select: {
      Item: true,
    },
  },
});
