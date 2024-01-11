import { agent } from '~/services/client/agent';
import type { ItemQueryInput } from './items.query';
import type { ItemListSchema } from './items.model';

export const getItemsApi = async (query?: ItemQueryInput) => {
  const typeSafeQuery = query as Record<string, any>;
  const response = await agent.getItems(typeSafeQuery);
  const body: Awaited<ItemListSchema> = await response.body;
  return body;
};
