"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useRef, useLayoutEffect, useCallback, useMemo } from "react";
import last from "lodash-es/last";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";
import Item from "~/components/shared/item";
import { QUERIES_KEY } from "~/constants/constants";
import { getItemsApi } from "~/server/items/items.api";
import useBeforeUnload from "~/libs/hooks/useBeforeUnload";
import useIsHydrating from "~/libs/hooks/useIsHydrating";
import { isBrowser } from "~/libs/browser/dom";
import { isEmpty } from "~/utils/assertion";
import { KeyProvider } from "~/libs/providers/key";

const useSSRLayoutEffect = !isBrowser ? () => {} : useLayoutEffect;

interface ItemListProps {
  type: "root" | "search";
  category?: string;
  tag?: string;
  q?: string;
  userId?: string;
}

type Cache = {
  top: number;
  pages: string[];
};

export default function ItemList({
  userId,
  type = "root",
  q,
  tag,
  category,
}: ItemListProps) {
  const $virtuoso = useRef<VirtuosoHandle>(null);
  const $cache = useRef<Cache | null>(null);

  const key = useMemo(() => {
    return `@items::scroll::${type}`;
  }, [type]);

  const getCache = useCallback(() => {
    return $cache.current;
  }, []);

  const setCache = useCallback((data: Cache | null) => {
    $cache.current = data;
  }, []);

  const hydrating = useIsHydrating("[data-hydrating-signal]");

  const queryKey = useMemo(() => {
    return QUERIES_KEY.items.root;
  }, []);

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: async ({ pageParam }) => {
      return await getItemsApi({
        ...(category ? { category } : {}),
        ...(tag ? { tag } : {}),
        ...(type ? { type } : {}),
        ...(type && type === "search" ? { q } : {}),
        ...(userId ? { userId: userId } : {}),
        limit: 10,
        cursor: pageParam ? pageParam : undefined,
      });
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNextPage && lastPage?.endCursor
        ? lastPage?.endCursor
        : null;
    },
  });

  const list = data?.pages?.map((page) => page?.list).flat() ?? [];

  const loadMore = (index: number) => {
    if (index <= 0) return;

    const lastData = last(data?.pages ?? []);

    if (lastData?.endCursor && lastData?.hasNextPage) {
      fetchNextPage();
    }
  };

  useBeforeUnload(() => {
    const $api = $virtuoso.current;
    if (!$api) return;
    $api.getState((state) => {
      sessionStorage.setItem(
        key,
        JSON.stringify({
          top: state.scrollTop,
          pages: data?.pages
            ?.filter((page) => page?.endCursor)
            ?.map((page) => page.endCursor)
            ?.filter(Boolean),
        })
      );
    });
  });

  useSSRLayoutEffect(() => {
    if (hydrating) {
      const _data = JSON.parse(sessionStorage.getItem(key) || "{}") as Cache;
      if (_data) setCache(_data);
    }
    return () => {
      sessionStorage.removeItem(key);
    };
  }, [hydrating]);

  const fetchScrollRestoration = async () => {
    const _data = getCache();
    if (_data && !isEmpty(_data)) {
      const _pages = data?.pages ?? [];
      const currentCursor = _pages.at(_pages.length - 1)?.endCursor;
      const _cursorIndex = _data.pages.findIndex(
        (page) => page === currentCursor
      );
      const _pagesAfterCursor = _data.pages.slice(_cursorIndex + 1);
      for (const page of _pagesAfterCursor) {
        await fetchNextPage();
      }
      setCache(null);
      $virtuoso.current?.scrollTo({
        top: _data.top,
        behavior: "smooth",
      });
    }
  };

  useSSRLayoutEffect(() => {
    if (hydrating) fetchScrollRestoration();
  }, [hydrating]);

  const lastItem = last(data?.pages ?? []);

  return (
    <KeyProvider queryKey={queryKey}>
      <Virtuoso
        ref={$virtuoso}
        data-hydrating-signal
        useWindowScroll
        style={{ height: "100%" }}
        data={list}
        totalCount={lastItem?.totalCount ?? 0}
        computeItemKey={(index, item) => {
          if (!item) {
            return `${type}-threads-${index}`;
          }
          return `${type}-threads-${item.id}-${index}`;
        }}
        overscan={10}
        initialItemCount={list.length - 1}
        itemContent={(_, item) => {
          return <Item item={item} />;
        }}
        components={{
          Footer: () => <div className="h-20"></div>,
        }}
        endReached={loadMore}
      />
    </KeyProvider>
  );
}