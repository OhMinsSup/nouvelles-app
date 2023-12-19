import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QUERIES_KEY } from '~/constants/constants';
import { itemService } from '~/server/items/items.server';
import getQueryClient from '~/services/query/get-query-client';
import CardList from '~/components/shared/card-list';
import SearchForm from '~/components/shared/search-form';
import WindowScrollHidden from '~/components/shared/window-scroll-hidden';

interface PageProps {
  searchParams?: { q: string | undefined };
}

export default async function Pages({ searchParams }: PageProps) {
  const queryClient = getQueryClient();

  const q = searchParams?.q ? decodeURIComponent(searchParams.q) : undefined;

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.search(q),
    initialPageParam: null,
    queryFn: async () => {
      return itemService.getItems({
        type: 'search',
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

  if (isEmptyData) {
    return <>Empty</>;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <WindowScrollHidden>
        <CardList
          header={
            <section className="my-5 md:my-8 px-6">
              <SearchForm />
            </section>
          }
          q={q}
          type="search"
        />
      </WindowScrollHidden>
    </HydrationBoundary>
  );
}
