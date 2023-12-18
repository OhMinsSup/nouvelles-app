'server-only';
import dayjs from 'dayjs';
import type { Prisma } from '@nouvelles/database';
import { db } from '@nouvelles/database';
import { selectByItem } from '~/server/items/items.selector';
import type { ItemQuery } from '~/server/items/items.query';
import type { ItemSchema } from '~/server/items/items.model';

interface FindByTagWithCategory {
  tag?: string;
  category?: string;
}

export class ItemService {
  getItems(query: ItemQuery, currentUserId?: string) {
    switch (query.type) {
      case 'search':
        return this._getItemsBySearch(query, currentUserId);
      case 'today':
        return this._getItemsByToDay(query);
      default:
        return this._getItemsByCursor(query, currentUserId);
    }
  }

  getDefaultItems<Data = any>() {
    return {
      totalCount: 0,
      list: [] as Data[],
      endCursor: null,
      hasNextPage: false,
    };
  }

  private async findByTagWithCategory(input: FindByTagWithCategory) {
    const categoryItem = input.category
      ? await db.category.findFirst({
          where: {
            name: input.category,
          },
        })
      : undefined;

    const tagItem = input.tag
      ? await db.tag.findFirst({
          where: {
            name: input.tag,
          },
        })
      : undefined;

    return {
      categoryItem,
      tagItem,
    };
  }

  private async _getItemsByCursor(
    { category, tag, cursor, limit }: ItemQuery,
    _?: string,
  ) {
    const { categoryItem, tagItem } = await this.findByTagWithCategory({
      tag,
      category,
    });

    const searchWhere: Prisma.ItemWhereInput = {
      ...(categoryItem && {
        Category: {
          id: categoryItem.id,
        },
      }),
      ...(tagItem && {
        ItemTag: {
          some: {
            tag: {
              id: tagItem.id,
            },
          },
        },
      }),
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
          where: {
            ...searchWhere,
            id: cursor
              ? {
                  lt: cursor,
                }
              : undefined,
          },
          select: selectByItem,
          take: limit,
        }),
      ]);

      const endItem = list.at(-1);

      const endCursor = endItem?.id ?? null;
      const hasNextPage =
        endItem && endCursor
          ? (await db.item.count({
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

  private async _getItemsBySearch({ q, tag, category }: ItemQuery, _?: string) {
    try {
      const [totalCount, list] = await Promise.all([
        db.item.count({
          where: {
            OR: [
              {
                title: {
                  contains: q,
                },
              },
              {
                description: {
                  contains: q,
                },
              },
            ],
            ...(category && {
              Category: {
                name: category,
              },
            }),
            ...(tag && {
              ItemTag: {
                some: {
                  tag: {
                    name: tag,
                  },
                },
              },
            }),
          },
        }),
        db.item.findMany({
          orderBy: {
            id: 'desc',
          },
          where: {
            OR: [
              {
                title: {
                  contains: q,
                },
              },
              {
                description: {
                  contains: q,
                },
              },
            ],
            ...(category && {
              Category: {
                name: category,
              },
            }),
            ...(tag && {
              ItemTag: {
                some: {
                  tag: {
                    name: tag,
                  },
                },
              },
            }),
          },
          select: selectByItem,
        }),
      ]);

      const endItem = list.at(-1);
      const endCursor = endItem?.id ?? null;
      const hasNextPage =
        endItem && endCursor
          ? (await db.item.count({
              where: {
                id: {
                  lt: endCursor,
                },
                ...(endItem.pulbishedAt && {
                  pulbishedAt: {
                    lt: endItem.pulbishedAt,
                  },
                }),
                ...(category && {
                  Category: {
                    name: category,
                  },
                }),
                ...(tag && {
                  ItemTag: {
                    some: {
                      tag: {
                        name: tag,
                      },
                    },
                  },
                }),
                OR: [
                  {
                    title: {
                      contains: q,
                    },
                  },
                  {
                    description: {
                      contains: q,
                    },
                  },
                ],
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

  private async _getItemsByToDay({ category, tag }: ItemQuery, _?: string) {
    const start = dayjs().startOf('day').toDate();
    const end = dayjs().endOf('day').toDate();

    const { categoryItem, tagItem } = await this.findByTagWithCategory({
      tag,
      category,
    });

    const searchWhere: Prisma.ItemWhereInput = {
      ...(categoryItem && {
        Category: {
          id: categoryItem.id,
        },
      }),
      ...(tagItem && {
        ItemTag: {
          some: {
            tag: {
              id: tagItem.id,
            },
          },
        },
        pulbishedAt: {
          gte: start,
          lte: end,
        },
      }),
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

      return {
        totalCount,
        list: list as unknown as ItemSchema[],
        endCursor: null,
        hasNextPage: false,
      };
    } catch (error) {
      return this.getDefaultItems<ItemSchema>();
    }
  }
}

export const itemService = new ItemService();
