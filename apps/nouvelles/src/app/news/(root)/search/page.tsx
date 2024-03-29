import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QUERIES_KEY } from '~/constants/constants';
import { itemService } from '~/services/api/items/items.server';
import getQueryClient from '~/services/query/get-query-client';
import CardList from '~/components/shared/card-list';
import SearchForm from '~/components/shared/search-form';

interface PageProps {
  searchParams?: { q: string | undefined };
}

export default async function Pages({ searchParams }: PageProps) {
  const queryClient = getQueryClient();

  const q = searchParams?.q;

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.search(q),
    initialPageParam: null,
    queryFn: async () => {
      return itemService.all({
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardList
        header={
          <section className="border-x py-5 md:py-8 px-6">
            <SearchForm initialValue={q} />
          </section>
        }
        q={q}
        totalCount={totalCount}
        type="search"
      />
    </HydrationBoundary>
  );
}
