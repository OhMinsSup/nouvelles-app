import { db } from '@nouvelles/database';
import { injectable, singleton } from 'tsyringe';
// types
import type { Tag } from '@nouvelles/database';

interface Service {
  findOrCreate: (text: string) => Promise<Tag>;
}

@singleton()
@injectable()
export class TagsService implements Service {
  public async findOrCreate(text: string): Promise<Tag> {
    const data = await db.tag.findUnique({
      where: {
        name: text,
      },
    });
    if (!data) {
      const tag = await db.tag.create({
        data: {
          name: text,
        },
      });
      return tag;
    }
    return data;
  }
}
