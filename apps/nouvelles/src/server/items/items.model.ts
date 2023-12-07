import type { Category, Item, Tag } from "@prisma/client";

type PaginationSchema = {
  totalCount: number;
  endCursor: string | null;
  hasNextPage: boolean;
};

export type ItemSchema = {
  id: Item["id"];
  neutralId: Item["neusralId"];
  reporter: Item["reporter"];
  title: Item["title"];
  link: Item["link"];
  realLink: Item["realLink"];
  description: Item["description"];
  pulbishedAt: Item["pulbishedAt"];
  image: Item["image"];
  Category: Pick<Category, "id" | "name">;
  ItemTag: {
    tag: Pick<Tag, "id" | "name">;
  }[];
};

export type ItemListSchema = PaginationSchema & {
  list: ItemSchema[];
};
