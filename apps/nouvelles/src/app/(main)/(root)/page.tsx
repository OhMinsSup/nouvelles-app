import React from "react";
import getQueryClient from "apps/nouvelles/src/services/query/get-query-client";
import ItemList from "apps/nouvelles/src/components/shared/item-list";
import { itemService } from "apps/nouvelles/src/server/items/items.server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QUERIES_KEY } from "apps/nouvelles/src/constants/constants";

interface Props {
  searchParams: { category: string | undefined; tag: string | undefined };
}

export default async function Pages({ searchParams }: Props) {
  const queryClient = getQueryClient();

  const category = searchParams?.category ?? undefined;
  const tag = searchParams?.tag ?? undefined;

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.root,
    initialPageParam: null,
    queryFn: async () => {
      return await itemService.getItems({
        limit: 10,
        category,
        tag,
      });
    },
  });

  const data = await queryClient.getQueryData<any>(QUERIES_KEY.items.root);

  const totalCount =
    data?.pages
      ?.map((page: any) => page?.totalCount)
      .flat()
      ?.at(0) ?? 0;

  const isEmptyData = totalCount === 0;

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {isEmptyData ? (
          <>Empty</>
        ) : (
          <ItemList type="root" category={category} tag={tag} />
        )}
      </HydrationBoundary>
    </>
  );
}
