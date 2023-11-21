// the `defer()` helper will be used to define a background function
import { defer } from "@defer/client";
import { nouvelles, type Item } from "./neusral.model";
import { isEmpty } from "~/utils/assertion";
import { db } from "~/server/db/prisma";
import dayjs from "dayjs";

const findOrCreate = async (text: string) => {
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

// a background function must be `async`
export async function getNeusralCollection() {
  let items: Item[] = [];
  try {
    items = await nouvelles.run();
  } catch (error) {
    console.error(error);
  } finally {
    await nouvelles.dispose();
  }

  if (isEmpty(items)) return false;

  const unionTags = new Set<string>();
  items.forEach((item) => {
    if (item.parentCategory) unionTags.add(item.parentCategory);
    if (item.childCategory) unionTags.add(item.childCategory);
  });

  const tags = Array.from(unionTags);

  const tagItems = await Promise.all(tags.map((tag) => findOrCreate(tag)));

  for (const item of items) {
    const { parentCategory, childCategory } = item;
    const tag1 = tagItems.find((tag) => tag.name === parentCategory);
    const tag2 = tagItems.find((tag) => tag.name === childCategory);

    const date = item.date ? dayjs(item.date).toDate() : undefined;

    await db.item.create({
      data: {
        neusralId: item.neusralId,
        reporter: item.reporter,
        title: item.title,
        link: item.link,
        description: item.description,
        pulbishedAt: date,
        ItemTag: {
          create: [
            {
              tag: {
                connect: {
                  id: tag1?.id,
                },
              },
            },
            {
              tag: {
                connect: {
                  id: tag2?.id,
                },
              },
            },
          ],
        },
      },
    });
  }

  return true;
}

export default defer(getNeusralCollection);
