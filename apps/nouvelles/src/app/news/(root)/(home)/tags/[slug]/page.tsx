import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import getQueryClient from '~/services/query/get-query-client';
import CardList from '~/components/shared/card-list';
import { itemService } from '~/server/items/items.server';
import { QUERIES_KEY } from '~/constants/constants';
import CategoryWithTagHeader from '~/components/shared/category-with-tag-header';
import { tagsService } from '~/server/tags/tags.server';
import WindowScrollHidden from '~/components/shared/window-scroll-hidden';

interface PageProps {
  params: { slug: string };
}

export default async function Pages({ params }: PageProps) {
  const name = decodeURIComponent(params.slug);

  const tagInfo = await tagsService.findBySlug(name);
  if (!tagInfo) {
    notFound();
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.tags(name),
    initialPageParam: null,
    queryFn: async () => {
      return itemService.getItems({
        limit: 10,
        type: 'tags',
        tag: name,
      });
    },
  });

  const data = await queryClient.getQueryData<any>(
    QUERIES_KEY.items.tags(name),
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
      <WindowScrollHidden>
        <CardList
          header={
            <CategoryWithTagHeader
              count={tagInfo._count.ItemTag ?? 0}
              id={tagInfo.id}
              name={tagInfo.name}
              slug={tagInfo.slug}
              type="tags"
            />
          }
          tag={name}
          type="tags"
        />
      </WindowScrollHidden>
    </HydrationBoundary>
  );
}
