import type { ItemListSchema } from '~/server/items/items.model';
import type { ItemQueryInput } from '~/server/items/items.query';
import { agent } from '~/services/client/agent';

export const getItemsApi = async (query?: ItemQueryInput) => {
  const { body } = await agent.getItems(query as Record<string, any>);
  return body as ItemListSchema;
};
