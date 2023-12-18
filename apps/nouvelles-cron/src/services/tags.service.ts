import { db } from '@nouvelles/database';
import { injectable, singleton } from 'tsyringe';
import type { Tag } from '@nouvelles/database';
import { getSlug } from '~/common/utils';

// types

interface Service {
  findOrCreate: (name: string) => Promise<Tag>;
  findByName: (name: string) => Promise<Tag | null>;
}

@singleton()
@injectable()
export class TagsService implements Service {
  public async findOrCreate(name: string): Promise<Tag> {
    const slug = getSlug(name);
    console.log('tags => slug', slug);
    const data = await db.tag.findUnique({
      where: {
        name,
        slug,
      },
    });
    if (!data) {
      const tag = await db.tag.create({
        data: {
          name,
          slug,
        },
      });
      return tag;
    }
    return data;
  }

  public async findByName(name: string) {
    const slug = getSlug(name);
    const data = await db.tag.findUnique({
      where: {
        name,
        slug,
      },
    });
    return data;
  }
}
