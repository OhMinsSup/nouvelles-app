import { db } from '@nouvelles/database';
import { injectable, singleton } from 'tsyringe';
// types
import type { Category } from '@nouvelles/database';

interface Service {
  findOrCreate: (text: string) => Promise<Category>;
}

@singleton()
@injectable()
export class CategoriesService implements Service {
  public async findOrCreate(text: string): Promise<Category> {
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
