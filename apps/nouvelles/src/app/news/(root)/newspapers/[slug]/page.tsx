import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '~/services/query/get-query-client';
import CategoryWithTagHeader from '~/components/shared/category-with-tag-header';
import CardList from '~/components/shared/card-list';
import { itemService } from '~/services/api/items/items.server';
import { QUERIES_KEY } from '~/constants/constants';
import { newspapersService } from '~/services/api/newspaper/newspaper.server';
import ContentCenterLayout from '~/components/shared/content-center-layout';

interface PageProps {
  params: { slug: string };
}

export default async function Pages({ params }: PageProps) {
  const decodeSlug = decodeURIComponent(params.slug);
  const info = await newspapersService.bySlug(decodeSlug);
  if (!info) {
    return (
      <ContentCenterLayout>
        <span className="truncate max-w-full text-sm font-normal text-muted-foreground underline-offset-4">
          신문사가 없습니다.
        </span>
      </ContentCenterLayout>
    );
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.newspaper(info.slug),
    initialPageParam: null,
    queryFn: async () => {
      return itemService.all({
        type: 'newspaper',
        newspaper: info.slug,
      });
    },
  });

  const data = await queryClient.getQueryData<any>(
    QUERIES_KEY.items.newspaper(info.slug),
  );

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
          신문사와 관련된 뉴스가 없습니다.
        </span>
      </ContentCenterLayout>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardList
        newspaper={info.slug}
        header={
          <CategoryWithTagHeader
            count={info._count?.Item}
            id={info.id}
            name={info.name}
            slug={info.slug}
            type="newspaper"
          />
        }
        type="newspaper"
      />
    </HydrationBoundary>
  );
}
