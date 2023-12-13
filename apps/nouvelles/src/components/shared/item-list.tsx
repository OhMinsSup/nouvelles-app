'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import last from 'lodash-es/last';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { useBeforeUnload, useIsHydrating, isBrowser } from '@nouvelles/react';
import { isEmpty } from '@nouvelles/libs';
import Item from '~/components/shared/item';
import { QUERIES_KEY } from '~/constants/constants';
import { getItemsApi } from '~/server/items/items.api';
import { KeyProvider } from '~/libs/providers/key';

const useSSRLayoutEffect = !isBrowser ? () => {} : useLayoutEffect;

interface ItemListProps {
  type: 'root' | 'search' | 'today';
  category?: string;
  tag?: string;
  q?: string;
  userId?: string;
}

interface Cache {
  top: number;
  pages: string[];
}

export default function ItemList({
  userId,
  type = 'root',
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

  const hydrating = useIsHydrating('[data-hydrating-signal]');

  const queryKey = useMemo(() => {
    return QUERIES_KEY.items.root;
  }, []);

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => {
      return getItemsApi({
        type,
        ...(category ? { category } : {}),
        ...(tag ? { tag } : {}),
        ...(type === 'search' ? { q } : {}),
        ...(userId ? { userId } : {}),
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

  const list = data?.pages.map((page) => page?.list).flat() ?? [];

  const loadMore = (index: number) => {
    if (index <= 0) return;

    const lastData = last(data?.pages ?? []);

    if (lastData?.endCursor && lastData?.hasNextPage) {
      void fetchNextPage();
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
            .filter((page) => page?.endCursor)
            ?.map((page) => page.endCursor)
            ?.filter(Boolean),
        }),
      );
    });
  });

  useSSRLayoutEffect(() => {
    if (hydrating) {
      const _data = JSON.parse(sessionStorage.getItem(key) || '{}') as Cache;
      if (!isEmpty(_data)) setCache(_data);
    }
    return () => {
      sessionStorage.removeItem(key);
    };
  }, [hydrating]);

  const fetchScrollRestoration = () => {
    const _data = getCache();
    if (_data && !isEmpty(_data)) {
      const _pages = data?.pages ?? [];
      const currentCursor = _pages.at(_pages.length - 1)?.endCursor;
      const _cursorIndex = _data.pages.findIndex(
        (page) => page === currentCursor,
      );
      const _pagesAfterCursor = _data.pages.slice(_cursorIndex + 1);
      _pagesAfterCursor.map(() => fetchNextPage());
      setCache(null);
      $virtuoso.current?.scrollTo({
        top: _data.top,
        behavior: 'smooth',
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
        components={{
          // eslint-disable-next-line react/no-unstable-nested-components
          Footer: () => <div className="h-20" />,
        }}
        computeItemKey={(index, item) => {
          if (!item) {
            return `${type}-items-${index}`;
          }
          return `${type}-items-${item.id}-${index}`;
        }}
        data={list}
        data-hydrating-signal
        endReached={loadMore}
        initialItemCount={list.length - 1}
        // eslint-disable-next-line react/no-unstable-nested-components
        itemContent={(_, item) => {
          return <Item item={item} />;
        }}
        overscan={10}
        ref={$virtuoso}
        style={{ height: '100%' }}
        totalCount={lastItem?.totalCount ?? 0}
        useWindowScroll
      />
    </KeyProvider>
  );
}
