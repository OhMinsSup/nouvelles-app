import { db } from '@nouvelles/database';
import { injectable, singleton } from 'tsyringe';
// types
import type { Newspaper } from '@nouvelles/database';

interface Service {
  findOrCreate(text: string): Promise<Newspaper>;
}

@singleton()
@injectable()
export class NewspapersService implements Service {
  public async findOrCreate(text: string): Promise<Newspaper> {
    const data = await db.newspaper.findUnique({
      where: {
        name: text,
      },
    });
    if (!data) {
      const newspaper = await db.newspaper.create({
        data: {
          name: text,
        },
      });
      return newspaper;
    }
    return data;
  }
}
