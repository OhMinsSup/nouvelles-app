'server-only';
import { db } from '@nouvelles/database';
import { selectByCategory } from '~/server/categories/categories.selector';

export class CategoriesService {
  public findMany() {
    return db.category.findMany();
  }

  public findBySlug(slug: string) {
    return db.category.findUnique({
      where: {
        slug,
      },
      select: selectByCategory,
    });
  }
}

export const categoriesService = new CategoriesService();
