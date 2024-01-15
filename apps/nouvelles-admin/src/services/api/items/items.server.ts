'server-only';
import type { Prisma } from '@nouvelles/database';
import { db } from '@nouvelles/database';
import { selectByItem } from '~/services/api/items/items.selector';
import type { ItemSchema } from '~/services/api/items/items.model';
import type { ItemQueryInput } from '~/services/api/items/items.query';

export class ItemService {
  async all(input: ItemQueryInput) {
    const { pageNo, limit } = input;

    if (!pageNo || !limit) {
      return this.getDefaultItems<ItemSchema>();
    }

    try {
      const [totalCount, list] = await Promise.all([
        db.item.count(),
        db.item.findMany({
          orderBy: {
            id: 'desc',
          },
          skip: (pageNo - 1) * limit,
          take: limit,
          select: selectByItem,
        }),
      ]);

      const endItem = list.at(-1);

      const endCursor = endItem?.id ?? null;
      const hasNextPage =
        endItem && endCursor
          ? (await db.item.count({
              orderBy: {
                id: 'desc',
              },
              where: {
                id: {
                  lt: endCursor,
                },
              },
            })) > 0
          : false;

      return {
        totalCount,
        list: list as unknown as ItemSchema[],
        endCursor,
        hasNextPage,
      };
    } catch (error) {
      return this.getDefaultItems<ItemSchema>();
    }
  }

  async byToDays(id: number) {
    const searchWhere: Prisma.ItemWhereInput = {
      collectingDateId: id,
      title: {
        not: null,
      },
      description: {
        not: null,
      },
      image: {
        not: null,
      },
      realLink: {
        not: null,
      },
    };

    try {
      const [totalCount, list] = await Promise.all([
        db.item.count({
          where: searchWhere,
        }),
        db.item.findMany({
          orderBy: {
            id: 'desc',
          },
          where: searchWhere,
          select: selectByItem,
        }),
      ]);

      const endItem = list.at(-1);

      const endCursor = endItem?.id ?? null;
      const hasNextPage =
        endItem && endCursor
          ? (await db.item.count({
              orderBy: {
                id: 'desc',
              },
              where: {
                id: {
                  lt: endCursor,
                },
                ...searchWhere,
              },
            })) > 0
          : false;

      return {
        totalCount,
        list: list as unknown as ItemSchema[],
        endCursor,
        hasNextPage,
      };
    } catch (error) {
      return this.getDefaultItems<ItemSchema>();
    }
  }

  getDefaultItems<Data = any>() {
    return {
      totalCount: 0 as number,
      list: [] as Data[],
      endCursor: null as null | number,
      hasNextPage: false as boolean,
    };
  }
}

export const itemService = new ItemService();
