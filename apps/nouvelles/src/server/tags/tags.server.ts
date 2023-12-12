"server-only";
import { db } from "@nouvelles/database";
import type { Tag } from "@nouvelles/database";

export class TagsService {
  async findOrCreate(text: string): Promise<Tag> {
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

export const tagsService = new TagsService();
