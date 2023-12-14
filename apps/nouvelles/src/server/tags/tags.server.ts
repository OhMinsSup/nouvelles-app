'server-only';
import { db } from '@nouvelles/database';

export class TagsService {
  public findMany() {
    return db.tag.findMany();
  }
}

export const tagsService = new TagsService();
