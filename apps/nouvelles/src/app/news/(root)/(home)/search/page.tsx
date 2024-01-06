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

  const q = searchParams?.q ? decodeURIComponent(searchParams.q) : undefined;

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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardList
        header={
          <section className="my-5 md:my-8 px-6">
            <SearchForm />
          </section>
        }
        q={q}
        type="search"
      />
    </HydrationBoundary>
  );
}
