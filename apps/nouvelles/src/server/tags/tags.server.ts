'server-only';
import { db } from '@nouvelles/database';
import { selectByTag } from '~/server/tags/tags.selector';

export class TagsService {
  public findMany() {
    return db.tag.findMany();
  }

  public findBySlug(slug: string) {
    console.log('slug', slug);
    return db.tag.findUnique({
      where: {
        slug,
      },
      select: selectByTag,
    });
  }
}

export const tagsService = new TagsService();
