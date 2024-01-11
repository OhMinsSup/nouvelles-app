'server-only';
import type { Prisma } from '@nouvelles/database';
import { db } from '@nouvelles/database';
import { selectByItem } from '~/services/api/items/items.selector';
import type { ItemQueryInput } from '~/services/api/items/items.query';
import type { ItemSchema } from '~/services/api/items/items.model';

export class ItemService {
  all(input: ItemQueryInput) {
    try {
      switch (input.type) {
        case 'search':
          return this._getItemsBySearch(input);
        case 'today':
          return this._getItemsByToDay(input);
        case 'tags':
          return this._getItemsByTag(input);
        case 'categories':
          return this._getItemsByCategory(input);
        default:
          return this._getItemsByCursor(input);
      }
    } catch (error) {
      return Promise.resolve(this.getDefaultItems<ItemSchema>());
    }
  }

  async getRssFeedCategories(slug: string) {
    const category = await db.category.findFirst({
      where: {
        slug,
      },
    });

    if (!category) {
      return [];
    }

    const items = await db.item.findMany({
      where: {
        categoryId: category.id,
        description: {
          not: null,
        },
        title: {
          not: null,
        },
        publishedAt: {
          not: null,
        },
        realLink: {
          not: null,
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      select: selectByItem,
      take: 30,
    });

    return items as unknown as ItemSchema[];
  }

  async getRssFeedTags(slug: string) {
    const tag = await db.tag.findFirst({
      where: {
        slug,
      },
    });

    if (!tag) {
      return [];
    }

    const items = await db.item.findMany({
      where: {
        ItemTag: {
          some: {
            tagId: tag.id,
          },
        },
        description: {
          not: null,
        },
        title: {
          not: null,
        },
        publishedAt: {
          not: null,
        },
        realLink: {
          not: null,
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      select: selectByItem,
      take: 30,
    });

    return items as unknown as ItemSchema[];
  }

  async getRssFeedToday() {
    const crawlers = await db.crawlerDateCollected.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });

    const [lastCrawlers] = crawlers;

    if (!lastCrawlers) {
      return [];
    }

    const items = await db.item.findMany({
      where: {
        collectingDateId: lastCrawlers.id,
        description: {
          not: null,
        },
        title: {
          not: null,
        },
        publishedAt: {
          not: null,
        },
        realLink: {
          not: null,
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
      select: selectByItem,
      take: 30,
    });

    return items as unknown as ItemSchema[];
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
    { category, tag, cursor, limit }: ItemQueryInput,
    _?: string,
  ) {
    const categoryItem = category
      ? await db.category.findFirst({
          where: {
            name: category,
          },
        })
      : undefined;

    const tagItem = tag
      ? await db.tag.findFirst({
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
          take: limit ?? 10,
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
    const crawlers = await db.crawlerDateCollected.findMany({
      orderBy: {
        id: 'desc',
      },
      take: 1,
    });

    const [lastCrawlers] = crawlers;

    if (!lastCrawlers) {
      return this.getDefaultItems<ItemSchema>();
    }

    const searchWhere: Prisma.ItemWhereInput = {
      collectingDateId: lastCrawlers.id,
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

      const tagId = tagItem.id;

      const [totalCount, list] = await Promise.all([
        db.item.count({
          where: {
            ItemTag: {
              some: {
                tagId,
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
                tagId,
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

      const categoryId = categoryItem.id;

      const [totalCount, list] = await Promise.all([
        db.item.count({
          where: {
            categoryId,
          },
        }),
        db.item.findMany({
          orderBy: {
            id: 'desc',
          },
          where: {
            categoryId,
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
