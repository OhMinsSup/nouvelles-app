// the `defer()` helper will be used to define a background function
import { defer } from "@defer/client";
import { nouvellesSite, type Nouvelle } from "./neusral.model";
import { itemService } from "~/server/items/items.server";

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

  try {
    await itemService.createItems(items);
  } catch (error) {
    console.error(error);
  } finally {
    nouvellesSite.cleanup();
  }
}

export default defer(getNeusralCollection);
