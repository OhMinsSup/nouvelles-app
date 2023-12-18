import { db } from '@nouvelles/database';
import { injectable, singleton } from 'tsyringe';
// types
import type { Category } from '@nouvelles/database';
import { getSlug } from '~/common/utils';

interface Service {
  findOrCreate: (name: string) => Promise<Category>;
  findByName: (name: string) => Promise<Category | null>;
}

@singleton()
@injectable()
export class CategoriesService implements Service {
  public async findOrCreate(name: string) {
    const slug = getSlug(name);
    const data = await db.category.findUnique({
      where: {
        name,
        slug,
      },
    });
    if (!data) {
      const tag = await db.category.create({
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
    const data = await db.category.findUnique({
      where: {
        name,
        slug,
      },
    });
    return data;
  }
}
