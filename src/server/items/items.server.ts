"server-only";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { db } from "~/server/db/prisma";
import { isInvaliDate, isString } from "~/utils/assertion";
import type { ItemQuery } from "~/server/items/items.query";

dayjs.extend(customParseFormat);

type InputCreate = {
  id: string;
  neusralId: string | undefined;
  category: string | undefined;
  tag: string | undefined;
  reporter: string | undefined;
  title: string | undefined;
  link: string | undefined;
  realLink: string | undefined;
  date: string | undefined;
  description: string | undefined;
};

export class ItemService {
  createItems() {}

  async createItem(input: InputCreate) {
    const {
      tag,
      category,
      neusralId,
      reporter,
      title,
      link,
      description,
      realLink,
    } = input;

    const exists = await db.item.findFirst({
      where: {
        neusralId,
        reporter,
        title,
        link,
        realLink,
      },
    });

    if (exists) {
      return exists;
    }

    const dateString = dayjs(input.date, "YY.MM.DD").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const dateTime = dayjs(dateString).toDate();
    const pulbishedAt = isInvaliDate(dateTime) ? undefined : dateTime;

    await db.item.create({
      data: {
        neusralId,
        reporter,
        title,
        link,
        realLink,
        description,
        pulbishedAt,
        // ...(categoryItem && {
        //   Category: {
        //     connect: {
        //       id: categoryItem?.id,
        //     },
        //   },
        // }),
        // ...(tagItem && {
        //   ItemTag: {
        //     create: [
        //       {
        //         tag: {
        //           connect: {
        //             id: tagItem?.id,
        //           },
        //         },
        //       },
        //     ],
        //   },
        // }),
      },
    });
  }

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
