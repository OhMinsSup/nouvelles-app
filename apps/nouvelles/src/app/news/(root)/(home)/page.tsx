import React from 'react';
import CardList from '~/components/shared/card-list';
import { api } from '~/libs/trpc/server';

export default async function Pages() {
  const data = await api.items.all.query({
    limit: 10,
  });

  const isEmptyData = data?.totalCount === 0;

  if (isEmptyData) {
    return <>Empty</>;
  }

  return <CardList initialData={data} type="root" />;
}
