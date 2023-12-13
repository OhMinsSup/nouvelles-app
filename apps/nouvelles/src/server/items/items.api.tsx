import type { ItemListSchema } from '~/server/items/items.model';
import type { ItemQuery } from '~/server/items/items.query';
import { agent } from '~/services/client/agent';

export const getItemsApi = async (query?: ItemQuery) => {
  const { body } = await agent.getItems(query as Record<string, any>);
  return body as ItemListSchema;
};
