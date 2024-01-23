'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useEventListener, useMemoizedFn } from '@nouvelles/react-hooks';
import { getTargetElement } from '@nouvelles/react';
import { Button } from '~/components/ui/button';
import { Icons } from '~/components/icons';
import { cn, optimizeAnimation } from '~/utils/utils';

export interface FloatingScrollTopActionButtonProps {
  onScrollToTop: () => void;
  scrollPosition?: 'up' | 'down' | 'idle';
}

export default function FloatingScrollTopActionButton(
  props: FloatingScrollTopActionButtonProps,
) {
  const $btn = useRef<HTMLButtonElement>(null);
  const [left, setLeft] = useState<string | undefined>(undefined);

  const [, startTransition] = useTransition();

  const caculateLeft = (
    width: number,
    $button: HTMLButtonElement,
    $card: HTMLDivElement,
  ) => {
    // 화면의 비율과 버튼의 비율을 맞춰서 계산
    const buttonRect = $button.getBoundingClientRect();
    const cardRect = $card.getBoundingClientRect();

    const cardProfileImageAreaWidth = 48; // px

    // width: 768px이하 모바일
    if (width <= 768) {
      const value = cardProfileImageAreaWidth - buttonRect.width + 10;
      setLeft(`${value}px`);
    }

    // width: 768px~1024px 태블릿
    if (width > 768 && width <= 1280) {
      const tabletSidebarSize = 64 * 2; // px (data-name="tablet-sidebar")
      const leftArea = (width - cardRect.width - tabletSidebarSize) / 2;
      const value = leftArea + cardProfileImageAreaWidth + buttonRect.width - 5;
      setLeft(`${value}px`);
    }

    // // width: 1280px 이상 데스크탑
    if (width > 1280) {
      const desktopSidebarSize = ((width - cardRect.width) / 2) * 1.02;
      const value =
        desktopSidebarSize - cardProfileImageAreaWidth - buttonRect.width;
      setLeft(`${value}px`);
    }
  };

  const caculatePosition = () => {
    const $button = getTargetElement($btn);
    const $card = document.querySelector<HTMLDivElement>(
      'div[data-name="card-item"]',
    );
    const width = window.innerWidth;
    if ($button && $card) {
      startTransition(() => {
        caculateLeft(width, $button, $card);
      });
    }
  };

  const memoizedResizeFn = useMemoizedFn(optimizeAnimation(caculatePosition));

  useEventListener('resize', memoizedResizeFn, {
    capture: true,
  });

  useEffect(() => {
    memoizedResizeFn();
  }, []);

  const onScrollToTop = useCallback(() => {
    startTransition(() => {
      props.onScrollToTop();
    });
  }, [props]);

  const styles: React.CSSProperties = useMemo(() => {
    return {
      left,
    };
  }, [left]);

  return (
    <div
      className={cn('fixed bottom-[10%] z-[1001]')}
      data-name="floating-scrolltop-action-button"
      style={styles}
    >
      <Button
        className={cn('rounded-full shadow-md', {
          hidden: props.scrollPosition === 'down',
        })}
        onClick={onScrollToTop}
        ref={$btn}
        size="icon"
        type="button"
        variant="outline"
      >
        <Icons.arrowUp />
      </Button>
    </div>
  );
}
