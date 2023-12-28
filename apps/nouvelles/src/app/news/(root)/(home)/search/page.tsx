import React from 'react';
import CardList from '~/components/shared/card-list';
import SearchForm from '~/components/shared/search-form';
import { api } from '~/libs/trpc/server';

interface PageProps {
  searchParams?: { q: string | undefined };
}

export default async function Pages({ searchParams }: PageProps) {
  const q = searchParams?.q ? decodeURIComponent(searchParams.q) : undefined;

  const data = await api.items.all.query({
    type: 'search',
    q,
  });

  return (
    <CardList
      header={
        <section className="my-5 md:my-8 px-6">
          <SearchForm />
        </section>
      }
      initialData={data}
      q={q}
      type="search"
    />
  );
}
