'use client';
import React from 'react';
import { useSuspenseTagsQuery } from '~/services/tags/use-tags-query';
import { Button } from '~/components/ui/button';

export default function SidebarTags() {
  const { data, isFetching } = useSuspenseTagsQuery();
  console.log(data, isFetching);
  if (isFetching) {
    return <>Loading...</>;
  }

  return (
    <>
      {data.map((tag) => (
        <Button
          className="pl-0 justify-start text-left w-full"
          key={tag.id}
          variant="link"
        >
          <span className="w-full truncate max-w-[120px]"># {tag.name}</span>
        </Button>
      ))}
    </>
  );
}
