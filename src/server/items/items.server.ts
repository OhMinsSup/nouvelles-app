"server-only";
import { db } from "~/server/db/prisma";
import { isString } from "~/utils/assertion";
import type { ItemQuery } from "~/server/items/items.query";

export class ItemService {
  getItems(query: ItemQuery, currentUserId?: string) {
    if (query.category === "search") {
      return this._getItemsBySearch(query, currentUserId);
    }
    return this._getItemsByCursor(query, currentUserId);
  }

  getDefaultItems<Data = any>() {
    return {
      totalCount: 0,
      list: [] as Data[],
      endCursor: null,
      hasNextPage: false,
    };
  }

  private async _getItemsByCursor(
    { cursor, limit }: ItemQuery,
    currentUserId?: string
  ) {
    if (isString(cursor)) {
      cursor = cursor;
    }

    if (isString(limit)) {
      limit = Number(limit);
    } else {
      limit = limit ?? 25;
    }

    try {
      const [totalCount, list] = await Promise.all([
        db.item.count(),
        db.item.findMany({
          select: {
            id: true,
            neusralId: true,
            reporter: true,
            title: true,
            link: true,
            realLink: true,
            description: true,
            pulbishedAt: true,
            Category: {
              select: {
                id: true,
                name: true,
              },
            },
            ItemTag: {
              select: {
                tag: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        }),
      ]);

      const endCursor = list.at(-1)?.id ?? null;
      const hasNextPage = endCursor
        ? (await db.item.count({
            where: {
              id: {
                lt: endCursor,
              },
            },
          })) > 0
        : false;

      return {
        totalCount,
        list,
        endCursor,
        hasNextPage,
      };
    } catch (error) {
      return this.getDefaultItems();
    }
  }

  private async _getItemsBySearch(
    { cursor, limit, q }: ItemQuery,
    currentUserId?: string
  ) {
    if (isString(cursor)) {
      cursor = cursor;
    }

    if (isString(limit)) {
      limit = Number(limit);
    } else {
      limit = limit ?? 25;
    }

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
              {
                ItemTag: {
                  some: {
                    tag: {
                      name: {
                        contains: q,
                      },
                    },
                  },
                },
              },
              {
                Category: {
                  name: {
                    contains: q,
                  },
                },
              },
            ],
          },
        }),
        db.item.findMany({
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
              {
                ItemTag: {
                  some: {
                    tag: {
                      name: {
                        contains: q,
                      },
                    },
                  },
                },
              },
              {
                Category: {
                  name: {
                    contains: q,
                  },
                },
              },
            ],
          },
          select: {
            id: true,
            neusralId: true,
            reporter: true,
            title: true,
            link: true,
            realLink: true,
            description: true,
            pulbishedAt: true,
            Category: {
              select: {
                id: true,
                name: true,
              },
            },
            ItemTag: {
              select: {
                tag: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        }),
      ]);

      const endCursor = list.at(-1)?.id ?? null;
      const hasNextPage = endCursor
        ? (await db.item.count({
            where: {
              id: {
                lt: endCursor,
              },
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
                {
                  ItemTag: {
                    some: {
                      tag: {
                        name: {
                          contains: q,
                        },
                      },
                    },
                  },
                },
                {
                  Category: {
                    name: {
                      contains: q,
                    },
                  },
                },
              ],
            },
          })) > 0
        : false;

      return {
        totalCount,
        list,
        endCursor,
        hasNextPage,
      };
    } catch (error) {
      return this.getDefaultItems();
    }
  }
}

export const itemService = new ItemService();
