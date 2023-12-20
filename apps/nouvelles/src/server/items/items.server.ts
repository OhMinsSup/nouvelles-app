'server-only';
import dayjs from 'dayjs';
import type { Prisma } from '@nouvelles/database';
import { db } from '@nouvelles/database';
import { selectByItem } from '~/server/items/items.selector';
import type { ItemQueryInput } from '~/server/items/items.query';
import type { ItemSchema } from '~/server/items/items.model';

interface FindByTagWithCategory {
  tag?: string;
  category?: string;
}

export class ItemService {
  getItems(query: ItemQueryInput, currentUserId?: string) {
    try {
      switch (query.type) {
        case 'search':
          return this._getItemsBySearch(query, currentUserId);
        case 'today':
          return this._getItemsByToDay(query);
        case 'tags':
          return this._getItemsByTag(query);
        case 'categories':
          return this._getItemsByCategory(query);
        default:
          return this._getItemsByCursor(query, currentUserId);
      }
    } catch (error) {
      return Promise.resolve(this.getDefaultItems<ItemSchema>());
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

  private async _findByTagWithCategory(input: FindByTagWithCategory) {
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
    { category, tag, cursor, limit }: ItemQueryInput,
    _?: string,
  ) {
    const { categoryItem, tagItem } = await this._findByTagWithCategory({
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

  private async _getItemsBySearch({ q }: ItemQueryInput, _?: string) {
    try {
      const searchWhere: Prisma.ItemWhereInput = {
        title: {
          search: q,
        },
        description: {
          search: q,
        },
      };

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

  private async _getItemsByToDay(_: ItemQueryInput, __?: string) {
    const collectingDate = dayjs().startOf('day').toDate();

    const collectingData = await db.crawlerDateCollected.findFirst({
      where: {
        collectingDate,
      },
      orderBy: {
        id: 'desc',
      },
    });

    if (!collectingData) {
      return this.getDefaultItems<ItemSchema>();
    }

    const searchWhere: Prisma.ItemWhereInput = {
      collectingDateId: collectingData.id,
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

  private async _getItemsByTag(
    { tag, limit, cursor }: ItemQueryInput,
    _?: string,
  ) {
    try {
      const tagItem = await db.tag.findFirst({
        where: {
          slug: tag,
        },
      });

      if (!tagItem) {
        return this.getDefaultItems<ItemSchema>();
      }

      const [totalCount, list] = await Promise.all([
        db.item.count({
          where: {
            ItemTag: {
              some: {
                tagId: tagItem.id,
              },
            },
          },
        }),
        db.item.findMany({
          orderBy: {
            id: 'desc',
          },
          where: {
            ItemTag: {
              some: {
                tagId: tagItem.id,
              },
            },
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
              orderBy: {
                id: 'desc',
              },
              where: {
                id: {
                  lt: endCursor,
                },
                ItemTag: {
                  some: {
                    tagId: tagItem.id,
                  },
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

  private async _getItemsByCategory(
    { category, limit, cursor }: ItemQueryInput,
    _?: string,
  ) {
    try {
      const categoryItem = await db.category.findFirst({
        where: {
          slug: category,
        },
      });

      if (!categoryItem) {
        return this.getDefaultItems<ItemSchema>();
      }

      const [totalCount, list] = await Promise.all([
        db.item.count({
          where: {
            categoryId: categoryItem.id,
          },
        }),
        db.item.findMany({
          orderBy: {
            id: 'desc',
          },
          where: {
            categoryId: categoryItem.id,
            id: cursor
              ? {
                  lt: cursor,
                }
              : undefined,
          },
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
                categoryId: categoryItem.id,
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
}

export const itemService = new ItemService();
