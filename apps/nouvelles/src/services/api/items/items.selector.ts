'server-only';
import { Prisma } from '@nouvelles/database';

export const selectByItem = Prisma.validator<Prisma.ItemSelect>()({
  id: true,
  neusralId: true,
  title: true,
  link: true,
  realLink: true,
  description: true,
  publishedAt: true,
  image: true,
  createdAt: true,
  Newspaper: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  Category: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
  },
  ItemTag: {
    select: {
      tag: {
        select: {
          id: true,
          name: true,
          slug: true,
        },
      },
    },
  },
});
