'server-only';
import { db } from '@nouvelles/database';
import { selectByTag } from '~/server/tags/tags.selector';

export class TagsService {
  public findMany() {
    return db.tag.findMany();
  }

  public findByName(name: string) {
    return db.tag.findUnique({
      where: {
        name,
      },
      select: selectByTag,
    });
  }
}

export const tagsService = new TagsService();
