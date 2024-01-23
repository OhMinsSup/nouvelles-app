import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '~/services/query/get-query-client';
import CategoryWithTagHeader from '~/components/shared/category-with-tag-header';
import CardList from '~/components/shared/card-list';
import { itemService } from '~/services/api/items/items.server';
import { QUERIES_KEY } from '~/constants/constants';
import { categoriesService } from '~/services/api/categories/categories.server';
import ContentCenterLayout from '~/components/shared/content-center-layout';

interface PageProps {
  params: { slug: string };
}

export default async function Pages({ params }: PageProps) {
  const decodeSlug = decodeURIComponent(params.slug);
  const categoryInfo = await categoriesService.bySlug(decodeSlug);
  if (!categoryInfo) {
    return (
      <ContentCenterLayout>
        <span className="truncate max-w-full text-sm font-normal text-muted-foreground underline-offset-4">
          카테고리가 없습니다.
        </span>
      </ContentCenterLayout>
    );
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.categories(categoryInfo.slug),
    initialPageParam: null,
    queryFn: async () => {
      return itemService.all({
        type: 'categories',
        category: categoryInfo.slug,
      });
    },
  });

  const data = await queryClient.getQueryData<any>(
    QUERIES_KEY.items.categories(categoryInfo.slug),
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
          카테고리와 관련된 뉴스가 없습니다.
        </span>
      </ContentCenterLayout>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CardList
        category={categoryInfo.slug}
        header={
          <CategoryWithTagHeader
            count={categoryInfo._count?.Item}
            id={categoryInfo.id}
            name={categoryInfo.name}
            slug={categoryInfo.slug}
            type="categories"
          />
        }
        totalCount={totalCount}
        type="categories"
      />
    </HydrationBoundary>
  );
}
