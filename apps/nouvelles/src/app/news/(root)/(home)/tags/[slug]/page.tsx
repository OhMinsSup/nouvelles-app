import React from 'react';
import { notFound } from 'next/navigation';
import CardList from '~/components/shared/card-list';
import CategoryWithTagHeader from '~/components/shared/category-with-tag-header';
import { api } from '~/libs/trpc/server';

interface PageProps {
  params: { slug: string };
}

export default async function Pages({ params }: PageProps) {
  const name = decodeURIComponent(params.slug);

  const tagInfo = await api.tags.bySlug.query({ slug: name });

  if (!tagInfo) {
    notFound();
  }

  const data = await api.items.all.query({
    limit: 10,
    type: 'tags',
    tag: name,
  });

  const isEmptyData = data?.totalCount === 0;

  if (isEmptyData) {
    return <>Empty</>;
  }

  return (
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
      initialData={data}
      tag={name}
      type="tags"
    />
  );
}
