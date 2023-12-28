'server-only';
import dayjs from 'dayjs';
import type { Prisma } from '@nouvelles/database';
import { selectByItem } from '~/libs/trpc/router/items/items.selector';
import type { ItemQueryInput } from '~/libs/trpc/router/items/items.query';
import type { ItemSchema } from '~/libs/trpc/router/items/items.model';
import type { TRPCContext } from '~/libs/trpc/trpc-root';

export class ItemService {
  all(ctx: TRPCContext, input: ItemQueryInput) {
    try {
      switch (input.type) {
        case 'search':
          return this._getItemsBySearch(ctx, input);
        case 'today':
          return this._getItemsByToDay(ctx, input);
        case 'tags':
          return this._getItemsByTag(ctx, input);
        case 'categories':
          return this._getItemsByCategory(ctx, input);
        default:
          return this._getItemsByCursor(ctx, input);
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

  private async _getItemsByCursor(
    ctx: TRPCContext,
    { category, tag, cursor, limit }: ItemQueryInput,
    _?: string,
  ) {
    const categoryItem = category
      ? await ctx.db.category.findFirst({
          where: {
            name: category,
          },
        })
      : undefined;

    const tagItem = tag
      ? await ctx.db.tag.findFirst({
          where: {
            name: tag,
          },
        })
      : undefined;

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
        ctx.db.item.count({
          where: searchWhere,
        }),
        ctx.db.item.findMany({
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
          take: limit ?? 10,
        }),
      ]);

      const endItem = list.at(-1);

      const endCursor = endItem?.id ?? null;
      const hasNextPage =
        endItem && endCursor
          ? (await ctx.db.item.count({
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

  private async _getItemsBySearch(
    ctx: TRPCContext,
    { q }: ItemQueryInput,
    _?: string,
  ) {
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
        ctx.db.item.count({
          where: searchWhere,
        }),
        ctx.db.item.findMany({
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

  private async _getItemsByToDay(
    ctx: TRPCContext,
    _: ItemQueryInput,
    __?: string,
  ) {
    const collectingDate = dayjs().startOf('day').toDate();

    const collectingData = await ctx.db.crawlerDateCollected.findFirst({
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
        ctx.db.item.count({
          where: searchWhere,
        }),
        ctx.db.item.findMany({
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
          ? (await ctx.db.item.count({
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
    ctx: TRPCContext,
    { tag, limit, cursor }: ItemQueryInput,
    _?: string,
  ) {
    try {
      const tagItem = await ctx.db.tag.findFirst({
        where: {
          slug: tag,
        },
      });

      if (!tagItem) {
        return this.getDefaultItems<ItemSchema>();
      }

      const [totalCount, list] = await Promise.all([
        ctx.db.item.count({
          where: {
            ItemTag: {
              some: {
                tagId: tagItem.id,
              },
            },
          },
        }),
        ctx.db.item.findMany({
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
          take: limit ?? 10,
        }),
      ]);

      const endItem = list.at(-1);

      const endCursor = endItem?.id ?? null;
      const hasNextPage =
        endItem && endCursor
          ? (await ctx.db.item.count({
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
    ctx: TRPCContext,
    { category, limit, cursor }: ItemQueryInput,
    _?: string,
  ) {
    try {
      const categoryItem = await ctx.db.category.findFirst({
        where: {
          slug: category,
        },
      });

      if (!categoryItem) {
        return this.getDefaultItems<ItemSchema>();
      }

      const [totalCount, list] = await Promise.all([
        ctx.db.item.count({
          where: {
            categoryId: categoryItem.id,
          },
        }),
        ctx.db.item.findMany({
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
          take: limit ?? 10,
          select: selectByItem,
        }),
      ]);

      const endItem = list.at(-1);

      const endCursor = endItem?.id ?? null;
      const hasNextPage =
        endItem && endCursor
          ? (await ctx.db.item.count({
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
