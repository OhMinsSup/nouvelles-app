import React from 'react';
import CardList from '~/components/shared/card-list';
import TodayHeader from '~/components/shared/today-header';
import { api } from '~/libs/trpc/server';

export default async function Pages() {
  const data = await api.items.all.query({
    limit: 10,
    type: 'today',
  });

  const isEmptyData = data?.totalCount === 0;

  if (isEmptyData) {
    return <>Empty</>;
  }

  return (
    <CardList
      header={<TodayHeader count={data.totalCount} />}
      initialData={data}
      type="today"
    />
  );
}
