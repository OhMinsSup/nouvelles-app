import { db } from '@nouvelles/database';
import { injectable, singleton } from 'tsyringe';
// types
import type { Newspaper } from '@nouvelles/database';
import { getSlug } from '~/common/utils';

interface Service {
  findOrCreate: (name: string) => Promise<Newspaper>;
  findByName: (name: string) => Promise<Newspaper | null>;
}

@singleton()
@injectable()
export class NewspapersService implements Service {
  public async findOrCreate(name: string) {
    const slug = getSlug(name);
    const data = await db.newspaper.findUnique({
      where: {
        name,
        slug,
      },
    });
    if (!data) {
      const newspaper = await db.newspaper.create({
        data: {
          name,
          slug,
        },
      });
      return newspaper;
    }
    return data;
  }

  public async findByName(name: string) {
    const slug = getSlug(name);
    const data = await db.newspaper.findUnique({
      where: {
        name,
        slug,
      },
    });
    return data;
  }
}
