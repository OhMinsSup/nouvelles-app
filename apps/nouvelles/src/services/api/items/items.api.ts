import { agent } from '~/services/client/agent';
import type { ItemQueryInput } from './items.query';
import type { ItemListSchema } from './items.model';

export const getItemsApi = async (query?: ItemQueryInput) => {
  const { body } = await agent.getItems(query as Record<string, any>);
  return body as ItemListSchema;
};
