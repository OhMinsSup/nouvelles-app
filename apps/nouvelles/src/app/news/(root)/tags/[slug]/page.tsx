import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import getQueryClient from '~/services/query/get-query-client';
import CardList from '~/components/shared/card-list';
import { itemService } from '~/services/api/items/items.server';
import { QUERIES_KEY } from '~/constants/constants';
import CategoryWithTagHeader from '~/components/shared/category-with-tag-header';
import { tagsService } from '~/services/api/tags/tags.server';
import ContentCenterLayout from '~/components/shared/content-center-layout';

interface PageProps {
  params: { slug: string };
}

export default async function Pages({ params }: PageProps) {
  const decodeSlug = decodeURIComponent(params.slug);
  const tagInfo = await tagsService.bySlug(decodeSlug);
  if (!tagInfo) {
    return (
      <ContentCenterLayout>
        <span className="truncate max-w-full text-sm font-normal text-muted-foreground underline-offset-4">
          태그가 없습니다.
        </span>
      </ContentCenterLayout>
    );
  }

  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.tags(tagInfo.slug),
    initialPageParam: null,
    queryFn: async () => {
      return itemService.all({
        type: 'tags',
        tag: tagInfo.slug,
      });
    },
  });

  const data = await queryClient.getQueryData<any>(
    QUERIES_KEY.items.tags(tagInfo.slug),
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
          태그와 관련된 뉴스가 없습니다.
        </span>
      </ContentCenterLayout>
    );
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
        tag={tagInfo.slug}
        type="tags"
      />
    </HydrationBoundary>
  );
}
