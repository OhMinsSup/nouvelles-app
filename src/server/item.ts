"server-only";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { isEmpty, isInvaliDate } from "~/utils/assertion";
import { db } from "~/server/db/prisma";

import * as tagService from "./tags";
import * as categoryService from "./category";

import type { Nouvelle } from "~/defer/neusral.model";
import type { Tag, Category } from "@prisma/client";

dayjs.extend(customParseFormat);

export const createItems = async (nouvelles: Nouvelle[]) => {
  if (isEmpty(nouvelles)) return false;

  const unionTags = new Set<string>();
  const unionCategories = new Set<string>();
  nouvelles.forEach((item) => {
    if (item.tag) unionTags.add(item.tag);
    if (item.category) unionCategories.add(item.category);
  });

  const tags = Array.from(unionTags);
  const categories = Array.from(unionCategories);

  let tagItems: Tag[] = [];
  try {
    tagItems = await Promise.all(
      tags.map((tag) => tagService.findOrCreate(tag))
    );
  } catch (error) {
    console.error(error);
    return false;
  }

  let categoryItems: Category[] = [];
  try {
    categoryItems = await Promise.all(
      categories.map((item) => categoryService.findOrCreate(item))
    );
  } catch (error) {
    console.error(error);
    return false;
  }

  try {
    for (const nouvelle of nouvelles) {
      const {
        tag,
        category,
        neusralId,
        reporter,
        title,
        link,
        description,
        realLink,
      } = nouvelle;

      const exists = await db.item.findFirst({
        where: {
          neusralId,
          reporter,
          title,
          link,
          realLink,
        },
      });

      if (exists) continue;

      const categoryItem = categoryItems.find((item) => item.name === category);
      const tagItem = tagItems.find((item) => item.name === tag);

      const dateString = dayjs(nouvelle.date, "YY.MM.DD").format(
        "YYYY-MM-DD HH:mm:ss"
      );
      const dateTime = dayjs(dateString).toDate();

      const pulbishedAt = isInvaliDate(dateTime) ? undefined : dateTime;

      await db.item.create({
        data: {
          neusralId,
          reporter,
          title,
          link,
          realLink,
          description,
          pulbishedAt,
          ...(categoryItem && {
            Category: {
              connect: {
                id: categoryItem?.id,
              },
            },
          }),
          ...(tagItem && {
            ItemTag: {
              create: [
                {
                  tag: {
                    connect: {
                      id: tagItem?.id,
                    },
                  },
                },
              ],
            },
          }),
        },
      });
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
