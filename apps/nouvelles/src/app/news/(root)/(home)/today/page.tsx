import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '~/services/query/get-query-client';
import CardList from '~/components/shared/card-list';
import { itemService } from '~/server/items/items.server';
import { QUERIES_KEY } from '~/constants/constants';
import TodayHeader from '~/components/shared/today-header';
import WindowScrollHidden from '~/components/shared/window-scroll-hidden';

interface PageProps {
  searchParams: { category: string | undefined; tag: string | undefined };
}

export default async function Pages({ searchParams }: PageProps) {
  const queryClient = getQueryClient();

  const category = searchParams?.category ?? undefined;
  const tag = searchParams?.tag ?? undefined;

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.today,
    initialPageParam: null,
    queryFn: async () => {
      return itemService.getItems({
        limit: 10,
        category,
        tag,
      });
    },
  });

  const data = await queryClient.getQueryData<any>(QUERIES_KEY.items.today);

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
          category={category}
          header={<TodayHeader count={totalCount} />}
          tag={tag}
          type="today"
        />
      </WindowScrollHidden>
    </HydrationBoundary>
  );
}
