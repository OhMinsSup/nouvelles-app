/* eslint-disable react/no-unstable-nested-components */
'use client';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import last from 'lodash-es/last';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import { isBrowser } from '@nouvelles/react';
import {
  useBeforeUnload,
  useIsHydrating,
  useUnmount,
} from '@nouvelles/react-hooks';
import { isEmpty } from '@nouvelles/libs';
import Card from '~/components/shared/card';
import { QUERIES_KEY } from '~/constants/constants';
import { KeyProvider } from '~/services/providers/key';
import type { ItemListSchema } from '~/services/api/items/items.model';
import { getItemsApi } from '~/services/api/items/items.api';

const useSSRLayoutEffect = !isBrowser ? () => {} : useLayoutEffect;

interface CardListProps {
  type: 'root' | 'search' | 'today' | 'tags' | 'categories';
  category?: string;
  tag?: string;
  q?: string;
  userId?: string;
  header?: React.ReactNode;
}

interface Restoration {
  top: number;
  pages: number[];
}

export default function CardList({
  userId,
  type = 'root',
  q,
  tag,
  category,
  header,
}: CardListProps) {
  const queryClient = useQueryClient();
  const $virtuoso = useRef<VirtuosoHandle>(null);
  const $restoration = useRef<Restoration | null>(null);
  const $observer = useRef<MutationObserver | null>(null);
  const $isLockFetching = useRef(false);

  const key = useMemo(() => {
    return `@items::scroll::${type}`;
  }, [type]);

  const getRestoration = useCallback(() => {
    return $restoration.current;
  }, []);

  const setRestoration = useCallback((data: Restoration | null) => {
    $restoration.current = data;
  }, []);

  const hydrating = useIsHydrating('[data-hydrating-signal]');

  const queryKey = useMemo(() => {
    if (type === 'categories' && category) {
      return QUERIES_KEY.items.categories(category);
    }
    if (type === 'tags' && tag) {
      return QUERIES_KEY.items.tags(tag);
    }
    if (type === 'search') {
      return QUERIES_KEY.items.search(q);
    }
    return QUERIES_KEY.items.root;
  }, [type, category, tag, q]);

  const closeMutationObserver = () => {
    if ($observer.current) {
      $observer.current.disconnect();
      $observer.current = null;
    }
  };

  const fetcher = (cursor: number | null) => {
    return getItemsApi({
      type,
      ...(category ? { category } : {}),
      ...(tag ? { tag } : {}),
      ...(type === 'search' && q ? { q } : {}),
      ...(userId ? { userId } : {}),
      limit: 10,
      cursor: cursor ? cursor : undefined,
    });
  };

  const getRestorationCursorIndex = () => {
    try {
      const _data = getRestoration();
      if (!_data || isEmpty(_data)) {
        return null;
      }
      if (isEmpty(_data.pages)) {
        return null;
      }
      const _pages = data?.pages ?? [];
      if (isEmpty(_pages)) {
        return null;
      }
      return {
        cusors: _data.pages,
        top: _data.top,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const setQueryHydrated = (prefetchData: ItemListSchema[]) => {
    if (!prefetchData || isEmpty(prefetchData)) return;

    try {
      queryClient.setQueryData(queryKey, (queryData: any) => {
        const _oldPages = (queryData.pages ?? []) as ItemListSchema[];
        const _oldPageParams = (queryData.pageParams ?? []) as number[];
        const _nextPageParams = prefetchData.map((page) => page?.endCursor);
        return {
          pages: [..._oldPages, ...prefetchData],
          pageParams: [..._oldPageParams, ..._nextPageParams],
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setRestoration(null);
    }
  };

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => fetcher(pageParam),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) => {
      return lastPage?.hasNextPage && lastPage?.endCursor
        ? lastPage?.endCursor
        : null;
    },
  });

  const oldPages = data?.pages ?? [];
  const flatPages = oldPages.map((page) => page?.list).flat() ?? [];

  const list = flatPages.filter(Boolean);

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
      const positions = JSON.stringify({
        top: state.scrollTop,
        pages: data?.pages
          .filter((page) => page?.endCursor)
          ?.map((page) => page.endCursor)
          ?.filter(Boolean),
      });
      sessionStorage.setItem(key, positions);
    });
  });

  useSSRLayoutEffect(() => {
    if (hydrating) {
      const _data = JSON.parse(
        sessionStorage.getItem(key) || '{}',
      ) as Restoration;
      if (!isEmpty(_data)) setRestoration(_data);
    }
    return () => {
      sessionStorage.removeItem(key);
    };
  }, [hydrating]);

  const fetchScrollRestoration = async () => {
    const result = getRestorationCursorIndex();
    if (
      !result ||
      (result && !result.top) ||
      (result && isEmpty(result.cusors))
    ) {
      return;
    }

    if ($isLockFetching.current) return;

    $isLockFetching.current = true;

    const prefetchData: Awaited<ItemListSchema[]> = await Promise.all(
      result.cusors.map((cursor) => fetcher(cursor)),
    );

    setQueryHydrated(prefetchData);

    closeMutationObserver();

    const $element = document.querySelector(
      'div[data-test-id="virtuoso-item-list"]',
    );

    if (!$element) return;

    $observer.current = new MutationObserver((el) => {
      if (!el || isEmpty(el)) {
        closeMutationObserver();
        return;
      }

      const target = last(el)?.target;
      if (!target) {
        closeMutationObserver();
        return;
      }

      if (!$element?.contains(target)) {
        return;
      }

      for (const _ of result.cusors) {
        $virtuoso.current?.scrollTo({
          top: result.top,
          behavior: 'smooth',
        });
      }

      closeMutationObserver();
    });

    $observer.current.observe($element, { childList: true });

    $virtuoso.current?.scrollTo({
      top: result.top,
      behavior: 'smooth',
    });
  };

  useSSRLayoutEffect(() => {
    if (hydrating) void fetchScrollRestoration();
  }, [hydrating]);

  useUnmount(() => {
    closeMutationObserver();
  });

  const lastItem = last(data?.pages ?? []);

  return (
    <KeyProvider queryKey={queryKey}>
      <Virtuoso
        components={{
          ...(header && {
            Header: () => <>{header}</>,
          }),
          Footer: () => {
            // 더이상 가져올 데이터가 없을 때
            if (lastItem && !lastItem.hasNextPage) {
              return (
                <div className="h-[300px]">
                  <Card.End />
                </div>
              );
            }
            return (
              <>
                {Array.from({ length: 3 }).map((_, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Card.Placeholder key={`card-placeholder-${index}`} />
                ))}
              </>
            );
          },
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
        itemContent={(_, item) => {
          return <Card item={item} />;
        }}
        overscan={10}
        ref={$virtuoso}
        style={{ height: '100%' }}
        totalCount={lastItem?.totalCount ?? 0}
      />
    </KeyProvider>
  );
}
