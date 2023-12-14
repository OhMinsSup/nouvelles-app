'server-only';
import { db } from '@nouvelles/database';

export class CategoriesService {
  public findMany() {
    return db.category.findMany();
  }
}

export const categoriesService = new CategoriesService();
