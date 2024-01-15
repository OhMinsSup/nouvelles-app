import type { Category, Item, Newspaper, Tag } from '@nouvelles/database';

export interface ItemSchema {
  id: Item['id'];
  neutralId: Item['neusralId'];
  title: Item['title'];
  link: Item['link'];
  realLink: Item['realLink'];
  description: Item['description'];
  publishedAt: Item['publishedAt'];
  image: Item['image'];
  Category: Pick<Category, 'id' | 'name' | 'slug'>;
  ItemTag: {
    tag: Pick<Tag, 'id' | 'name' | 'slug'>;
  }[];
  Newspaper: Pick<Newspaper, 'id' | 'name' | 'slug'>;
  createdAt: Item['createdAt'];
}
