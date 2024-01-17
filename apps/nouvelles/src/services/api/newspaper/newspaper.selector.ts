'server-only';
import { Prisma } from '@nouvelles/database';

export const selectByNewspaper = Prisma.validator<Prisma.NewspaperSelect>()({
  id: true,
  name: true,
  slug: true,
  _count: {
    select: {
      Item: true,
    },
  },
});
