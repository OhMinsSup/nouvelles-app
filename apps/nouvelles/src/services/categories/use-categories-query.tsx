import { useSuspenseQuery } from '@tanstack/react-query';
import type { Category } from '@nouvelles/database';
import { agent } from '~/services/client/agent';
import { QUERIES_KEY } from '~/constants/constants';

export function useSuspenseCategoriesQuery() {
  return useSuspenseQuery({
    queryKey: QUERIES_KEY.categories.root,
    queryFn: async () => {
      const data = await agent.getCategories();
      const result = await data.body;
      return (result?.items ?? []) as Category[];
    },
  });
}
