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
  async createItems(input: InputCreate[]) {
    const items = await Promise.all(input.map((item) => this.createItem(item)));
    return items;
  }

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

    const tagItem = await db.tag.findFirst({
      where: {
        name: tag,
      },
    });
    const categoryItem = await db.category.findFirst({
      where: {
        name: category,
      },
    });

    const dateString = dayjs(input.date, "YY.MM.DD").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    const dateTime = dayjs(dateString).toDate();
    const pulbishedAt = isInvaliDate(dateTime) ? undefined : dateTime;

    const data = await db.item.create({
      data: {
        neusralId,
        reporter,
        title,
        link,
        realLink,
        description,
        pulbishedAt,
        ...(categoryItem && {
          Category: {
            connect: {
              id: categoryItem.id,
            },
          },
        }),
        ...(tagItem && {
          ItemTag: {
            create: [
              {
                tag: {
                  connect: {
                    id: tagItem.id,
                  },
                },
              },
            ],
          },
        }),
      },
    });

    return data;
  }

  getItems(query: ItemQuery, currentUserId?: string) {
    if (query.type === "search") {
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
    { cursor, limit, category, tag }: ItemQuery,
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

    try {
      const [totalCount, list] = await Promise.all([
        db.item.count({
          where: {
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
          },
        }),
        db.item.findMany({
          where: {
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
          orderBy: {
            pulbishedAt: "desc",
          },
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
    { cursor, limit, q, tag, category }: ItemQuery,
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
          orderBy: {
            pulbishedAt: "desc",
          },
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
