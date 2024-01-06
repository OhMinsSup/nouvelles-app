import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import getQueryClient from '~/services/query/get-query-client';
import CategoryWithTagHeader from '~/components/shared/category-with-tag-header';
import CardList from '~/components/shared/card-list';
import { itemService } from '~/services/api/items/items.server';
import { QUERIES_KEY } from '~/constants/constants';
import { categoriesService } from '~/services/api/categories/categories.server';

interface PageProps {
  params: { slug: string };
}

export default async function Pages({ params }: PageProps) {
  const name = decodeURIComponent(params.slug);

  const categoryInfo = await categoriesService.bySlug(name);

  if (!categoryInfo) {
    notFound();
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.categories(name),
    initialPageParam: null,
    queryFn: async () => {
      return itemService.all({
        type: 'categories',
        category: name,
      });
    },
  });

  const data = await queryClient.getQueryData<any>(
    QUERIES_KEY.items.categories(name),
  );

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
      <CardList
        header={
          <CategoryWithTagHeader
            count={categoryInfo._count?.Item}
            id={categoryInfo.id}
            name={categoryInfo.name}
            slug={categoryInfo.slug}
            type="categories"
          />
        }
        tag={name}
        type="categories"
      />
    </HydrationBoundary>
  );
}
