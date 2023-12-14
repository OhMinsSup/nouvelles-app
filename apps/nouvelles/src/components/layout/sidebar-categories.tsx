'use client';
import React from 'react';
import { useSuspenseCategoriesQuery } from '~/services/categories/use-categories-query';
import { Button } from '~/components/ui/button';

export default function SidebarCategories() {
  const { data, isFetching } = useSuspenseCategoriesQuery();
  console.log(data, isFetching);
  if (isFetching) {
    return <>Loading...</>;
  }

  return (
    <>
      {data.map((category) => (
        <Button
          className="pl-0 justify-start text-left w-full"
          key={category.id}
          variant="link"
        >
          <span className="w-full truncate max-w-[120px]">
            # {category.name}
          </span>
        </Button>
      ))}
    </>
  );
}
