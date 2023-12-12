import { agent } from '~/services/client/agent';
import type { ItemQuery } from './items.query';
import type { ItemListSchema } from './items.model';

export const getItemsApi = async (query?: ItemQuery) => {
  const { body } = await agent.getItems(query);
  return body as ItemListSchema;
};
