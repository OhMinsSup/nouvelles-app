import { useSuspenseQuery } from '@tanstack/react-query';
import type { Tag } from '@nouvelles/database';
import { agent } from '~/services/client/agent';
import { QUERIES_KEY } from '~/constants/constants';

export function useSuspenseTagsQuery() {
  return useSuspenseQuery({
    queryKey: QUERIES_KEY.tags.root,
    queryFn: async () => {
      const data = await agent.getTags();
      const result = await data.body;
      return (result?.items ?? []) as Tag[];
    },
  });
}
