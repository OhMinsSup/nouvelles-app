import SearchInput from '~/components/search/search-input';
import SearchWapper from '~/components/search/search-wrapper';
import ItemList from '~/components/shared/item-list';
import { QUERIES_KEY } from '~/constants/constants';
import { itemService } from '~/server/items/items.server';
import getQueryClient from '~/services/query/get-query-client';

interface PagesProps {
  searchParams: { q: string | undefined };
}

export default async function Pages({ searchParams }: PagesProps) {
  const queryClient = getQueryClient();

  const q = searchParams.q ?? undefined;

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.search(q),
    initialPageParam: null,
    queryFn: () => {
      return itemService.getItems({
        limit: 10,
        category: 'search',
        q,
      });
    },
  });

  const data = await queryClient.getQueryData<any>(QUERIES_KEY.items.search(q));

  const totalCount =
    data?.pages
      ?.map((page: any) => page?.totalCount)
      .flat()
      ?.at(0) ?? 0;

  const isEmptyData = totalCount === 0;

  return (
    <>
      <SearchInput defaultValue={q} />
      <SearchWapper>
        {isEmptyData ? (
          <>Empty</>
        ) : (
          <ItemList category="search" q={q} type="search" />
        )}
      </SearchWapper>
    </>
  );
}
