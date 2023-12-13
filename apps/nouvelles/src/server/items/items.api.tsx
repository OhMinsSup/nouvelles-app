import type { ItemQuery } from './items.query';
import type { ItemListSchema } from './items.model';
import { agent } from '~/services/client/agent';

export const getItemsApi = async (query?: ItemQuery) => {
  const { body } = await agent.getItems(query as Record<string, any>);
  return body as ItemListSchema;
};
