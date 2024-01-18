import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '~/services/query/get-query-client';
import CardList, {
  CardListSkeleton,
  CardListWithHeaderSkeleton,
} from '~/components/shared/card-list';
import { itemService } from '~/services/api/items/items.server';
import { QUERIES_KEY } from '~/constants/constants';
import TodayHeader from '~/components/shared/today-header';
import ContentCenterLayout from '~/components/shared/content-center-layout';

export default async function Pages() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.today,
    initialPageParam: null,
    queryFn: async () => {
      return itemService.all({
        type: 'today',
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
    return (
      <ContentCenterLayout>
        <span className="truncate max-w-full text-sm font-normal text-muted-foreground underline-offset-4">
          오늘의 뉴스가 없습니다.
        </span>
      </ContentCenterLayout>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardList header={<TodayHeader count={totalCount} />} type="today" />
    </HydrationBoundary>
  );
}
