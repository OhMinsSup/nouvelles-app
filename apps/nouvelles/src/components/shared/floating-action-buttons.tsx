'use client';
import React, { useRef, useState } from 'react';
import {
  useEventListener,
  useMemoizedFn,
  useMediaQuery,
} from '@nouvelles/react-hooks';
import { getWindowScrollTop } from '@nouvelles/react';
import FloatingScrollTopActionButton, {
  type FloatingScrollTopActionButtonProps,
} from '~/components/shared/floating-scrolltop-action-button';
import { optimizeAnimation } from '~/utils/utils';
import FloatingWriteActionButton from '~/components/shared/floating-write-action-button';

type FloatingActionButtonProps = FloatingScrollTopActionButtonProps & {
  children: React.ReactNode;
};

export default function FloatingActionButtons({
  onScrollToTop,
  children,
}: FloatingActionButtonProps) {
  const $prevScrollTop = useRef(0);
  const isDesktop = useMediaQuery('(min-width: 1280px)', false);
  const [scrollPosition, setScrollPosition] = useState<'up' | 'down' | 'idle'>(
    'idle',
  );
  const scroll = () => {
    const scrollTop = getWindowScrollTop();

    // 현재 스크롤이 내려가는지 올라가는지 판단
    const isScrollDown = scrollTop > $prevScrollTop.current;

    if (isScrollDown) {
      // 헤더가 사라지는 경우
      if (scrollTop > 0) {
        setScrollPosition('up');
      } else {
        setScrollPosition('down');
      }
    } else {
      // 스크롤이 올라가는 경우
      setScrollPosition('down');
    }

    $prevScrollTop.current = scrollTop;
  };

  const memoizedScrollFn = useMemoizedFn(optimizeAnimation(scroll));

  useEventListener('scroll', memoizedScrollFn);

  return (
    <>
      <FloatingScrollTopActionButton
        onScrollToTop={onScrollToTop}
        scrollPosition={scrollPosition}
      />
      {children}
      {isDesktop ? null : (
        <FloatingWriteActionButton scrollPosition={scrollPosition} />
      )}
    </>
  );
}
