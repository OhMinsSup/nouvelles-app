'server-only';
import { db } from '@nouvelles/database';
import { selectByCategory } from '~/services/api/categories/categories.selector';

export class CategoriesService {
  all() {
    return db.category.findMany({
      select: selectByCategory,
    });
  }

  bySlug(slug: string) {
    console.log('slug', slug);
    return db.category.findUnique({
      where: {
        slug,
      },
      select: selectByCategory,
    });
  }
}

export const categoriesService = new CategoriesService();
