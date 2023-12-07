// the `defer()` helper will be used to define a background function
import { defer } from "@defer/client";
import { nouvellesSite, type Nouvelle } from "./neusral.model";
import { tagsService } from "apps/nouvelles/src/server/tags/tags.server";
import { categoriesService } from "apps/nouvelles/src/server/categories/categories.server";
import { itemService } from "apps/nouvelles/src/server/items/items.server";
import { isEmpty } from "apps/nouvelles/src/utils/assertion";

// a background function must be `async`
export async function getNeusralCollection() {
  let items: Nouvelle[] = [];
  try {
    items = await nouvellesSite.run();
  } catch (error) {
    console.error(error);
  } finally {
    await nouvellesSite.close();
  }

  if (!isEmpty(items)) {
    const unionTags = new Set<string>();
    const unionCategories = new Set<string>();
    items.forEach((item) => {
      if (item.tag) unionTags.add(item.tag);
      if (item.category) unionCategories.add(item.category);
    });

    try {
      const tags = [...unionTags];
      await Promise.all(tags.map((tag) => tagsService.findOrCreate(tag)));
    } catch (error) {
      console.error(error);
    }

    try {
      const categories = [...unionCategories];
      await Promise.all(
        categories.map((item) => categoriesService.findOrCreate(item))
      );
    } catch (error) {
      console.error(error);
    }
  }

  try {
    await itemService.createItems(items);
  } catch (error) {
    console.error(error);
  } finally {
    nouvellesSite.cleanup();
  }
}

export default defer(getNeusralCollection);
