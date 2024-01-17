import type { Tag } from '@nouvelles/database';

export interface TagSchema {
  id: Tag['id'];
  name: Tag['name'];
  slug: Tag['slug'];
  createdAt: Tag['createdAt'];
}
