import type { Category, Item, Newspaper, Tag } from '@nouvelles/database';

interface PaginationSchema {
  totalCount: number;
  endCursor: number | null;
  hasNextPage: boolean;
}

export interface ItemSchema {
  id: Item['id'];
  neutralId: Item['neusralId'];
  title: Item['title'];
  link: Item['link'];
  realLink: Item['realLink'];
  description: Item['description'];
  pulbishedAt: Item['pulbishedAt'];
  image: Item['image'];
  Category: Pick<Category, 'id' | 'name' | 'slug'>;
  ItemTag: {
    tag: Pick<Tag, 'id' | 'name' | 'slug'>;
  }[];
  Newspaper: Pick<Newspaper, 'id' | 'name' | 'slug'>;
}

export type ItemListSchema = PaginationSchema & {
  list: ItemSchema[];
};
