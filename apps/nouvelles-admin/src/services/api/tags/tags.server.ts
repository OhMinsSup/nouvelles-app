'server-only';
import { db } from '@nouvelles/database';
import { selectByTag } from '~/services/api/tags/tags.selector';

export class TagsService {
  all() {
    return db.tag.findMany({
      select: selectByTag,
    });
  }

  bySlug(slug: string) {
    return db.tag.findUnique({
      where: {
        slug,
      },
      select: selectByTag,
    });
  }
}

export const tagsService = new TagsService();
