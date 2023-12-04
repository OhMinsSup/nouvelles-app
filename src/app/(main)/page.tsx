import React from "react";
import getQueryClient from "~/services/query/get-query-client";
import ItemList from "~/components/shared/item-list";
import { itemService } from "~/server/items/items.server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { QUERIES_KEY } from "~/constants/constants";

export default async function Pages() {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: QUERIES_KEY.items.root,
    initialPageParam: null,
    queryFn: async () => {
      return await itemService.getItems({
        limit: 10,
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
        {isEmptyData ? <>Empty</> : <ItemList type="root" />}
      </HydrationBoundary>
    </>
  );
}
