"server-only";
import { db } from "~/server/db/prisma";
import type { Category } from "@prisma/client";

export class CategoriesService {
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
