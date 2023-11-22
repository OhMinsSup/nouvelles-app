"server-only";
import { db } from "~/server/db/prisma";
import type { Tag } from "@prisma/client";

export const findOrCreate = async (text: string): Promise<Tag> => {
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
};
