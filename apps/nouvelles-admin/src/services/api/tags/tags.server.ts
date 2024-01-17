'server-only';
import { db } from '@nouvelles/database';
import { selectByTag } from '~/services/api/tags/tags.selector';
import type { TagSchema } from '~/services/api/tags/tags.model';
import type { TagsQueryInput } from '~/services/api/tags/tags.query';

export class TagsService {
  async all(input: TagsQueryInput) {
    const { pageNo, limit } = input;

    if (!pageNo || !limit) {
      return this.getDefaultItems<TagSchema>();
    }

    try {
      const [totalCount, list] = await Promise.all([
        db.tag.count(),
        db.tag.findMany({
          orderBy: {
            id: 'desc',
          },
          skip: (pageNo - 1) * limit,
          take: limit,
          select: selectByTag,
        }),
      ]);

      const endItem = list.at(-1);

      const endCursor = endItem?.id ?? null;
      const hasNextPage =
        endItem && endCursor
          ? (await db.tag.count({
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
        list: list as unknown as TagSchema[],
        endCursor,
        hasNextPage,
      };
    } catch (error) {
      return this.getDefaultItems<TagSchema>();
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

export const tagsService = new TagsService();
