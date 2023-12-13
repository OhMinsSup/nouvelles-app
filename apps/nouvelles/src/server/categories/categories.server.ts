'server-only';
import { db } from '@nouvelles/database';
import type { Category } from '@nouvelles/database';

export class CategoriesService {
  async findMany(): Promise<Category[]> {
    const data = await db.category.findMany();
    return data;
  }

  async findOrCreate(text: string): Promise<Category> {
    const data = await db.category.findUnique({
      where: {
        name: text,
      },
    });
    if (!data) {
      const category = await db.category.create({
        data: {
          name: text,
        },
      });
      return category;
    }
    return data;
  }
}

export const categoriesService = new CategoriesService();
