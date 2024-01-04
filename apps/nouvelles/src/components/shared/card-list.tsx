'use client';
import React, { useRef, useLayoutEffect, useCallback, useMemo } from 'react';
import last from 'lodash-es/last';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';
import {
  useBeforeUnload,
  useIsHydrating,
  useUnmount,
} from '@nouvelles/react-hooks';
import { isBrowser } from '@nouvelles/react';
import { isEmpty } from '@nouvelles/libs';
import Card from '~/components/shared/card';
import type { ItemListSchema } from '~/libs/trpc/router/items/items.model';
import { api } from '~/libs/trpc/react';

const useSSRLayoutEffect = !isBrowser ? () => {} : useLayoutEffect;

interface CardListProps {
  type: 'root' | 'search' | 'today' | 'tags' | 'categories';
  category?: string;
  tag?: string;
  q?: string;
  userId?: string;
  header?: React.ReactNode;
  initialData?: ItemListSchema;
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
  initialData,
}: CardListProps) {
  const utils = api.useUtils();
  const $virtuoso = useRef<VirtuosoHandle>(null);
  const $restoration = useRef<Restoration | null>(null);
  const $observer = useRef<MutationObserver | null>(null);
  const $isLockFetching = useRef(false);

  const input = useMemo(() => {
    return {
      type,
      ...(category ? { category: decodeURIComponent(category) } : {}),
      ...(tag ? { tag: decodeURIComponent(tag) } : {}),
      ...(type === 'search' && q ? { q: decodeURIComponent(q) } : {}),
      ...(userId ? { userId } : {}),
      limit: 10,
    };
  }, [category, q, tag, type, userId]);

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

  const closeMutationObserver = () => {
    if ($observer.current) {
      $observer.current.disconnect();
      $observer.current = null;
    }
  };

  const fetcher = (cursor: number | null) => {
    return utils.items.all.fetch({
      ...input,
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
      utils.items.all.setInfiniteData(input, (data) => {
        if (!data) {
          return {
            pages: [],
            pageParams: [],
          };
        }
        const _oldPages = data.pages;
        const _oldPageParams = data.pageParams;
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

  const { data, fetchNextPage } = api.items.all.useInfiniteQuery(input, {
    initialCursor: null as number | null,
    initialData: initialData
      ? () => {
          return {
            pages: [initialData],
            pageParams: [null],
          };
        }
      : undefined,
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
    <Virtuoso
      components={{
        ...(header && {
          // eslint-disable-next-line react/no-unstable-nested-components
          Header: () => <>{header}</>,
        }),
        // eslint-disable-next-line react/no-unstable-nested-components
        Footer: () => <div className="h-40" />,
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
        return <Card item={item} />;
      }}
      overscan={10}
      ref={$virtuoso}
      style={{ height: '100%' }}
      totalCount={lastItem?.totalCount ?? 0}
    />
  );
}
