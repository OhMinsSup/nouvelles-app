import React from 'react';
import { notFound } from 'next/navigation';
import CategoryWithTagHeader from '~/components/shared/category-with-tag-header';
import CardList from '~/components/shared/card-list';
import { api } from '~/libs/trpc/server';

interface PageProps {
  params: { slug: string };
}

export default async function Pages({ params }: PageProps) {
  const name = decodeURIComponent(params.slug);

  const categoryInfo = await api.categories.bySlug.query({ slug: name });

  if (!categoryInfo) {
    notFound();
  }

  const data = await api.items.all.query({
    limit: 10,
    type: 'categories',
    category: name,
  });

  const isEmptyData = data?.totalCount === 0;

  if (isEmptyData) {
    return <>Empty</>;
  }

  return (
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
      initialData={data}
      tag={name}
      type="categories"
    />
  );
}
