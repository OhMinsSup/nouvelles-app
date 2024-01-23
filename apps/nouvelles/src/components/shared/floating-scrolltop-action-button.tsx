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

  const caculateLeft = (width: number) => {
    // width: 768px이하 모바일
    if (width < 768) {
      setLeft('18px');
    }

    // width: 768px~1024px 태블릿
    if (width >= 768 && width <= 1280) {
      setLeft('calc(50vw - 282px)');
    }

    // // width: 1280px 이상 데스크탑
    if (width > 1280) {
      setLeft('calc(50vw - 282px)');
    }
  };

  const memoizedResizeFn = useMemoizedFn(
    optimizeAnimation(() => {
      const width = window.innerWidth;
      startTransition(() => {
        caculateLeft(width);
      });
    }),
  );

  useEventListener('resize', memoizedResizeFn);

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
      className={cn('fixed z-[49] bottom-[90px]', {
        hidden: !left,
      })}
      style={styles}
    >
      <Button
        className={cn('rounded-full shadow-sm', {
          hidden: props.scrollPosition === 'up',
        })}
        data-name="floating-scrolltop-action-button"
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
