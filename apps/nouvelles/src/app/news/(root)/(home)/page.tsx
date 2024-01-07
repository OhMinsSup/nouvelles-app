import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '~/services/query/get-query-client';
import CardList from '~/components/shared/card-list';
import { itemService } from '~/services/api/items/items.server';
import { QUERIES_KEY } from '~/constants/constants';
import ContentCenterLayout from '~/components/shared/content-center-layout';

interface PageProps {
  searchParams: { category: string | undefined; tag: string | undefined };
}

export default async function Pages({ searchParams }: PageProps) {
  const queryClient = getQueryClient();

  const category = searchParams?.category ?? undefined;
  const tag = searchParams?.tag ?? undefined;

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.root,
    initialPageParam: null,
    queryFn: async () => {
      return itemService.all({
        category,
        tag,
      });
    },
  });

  const data = await queryClient.getQueryData<any>(QUERIES_KEY.items.root);

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
          뉴스가 없습니다.
        </span>
      </ContentCenterLayout>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardList category={category} tag={tag} type="root" />
    </HydrationBoundary>
  );
}
