'use client';
import React, {
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

interface FloatingWriteActionButtonProps {
  scrollPosition?: 'up' | 'down' | 'idle';
}

export default function FloatingWriteActionButton({
  scrollPosition,
}: FloatingWriteActionButtonProps) {
  const $btn = useRef<HTMLButtonElement>(null);
  const [right, setRight] = useState<string | undefined>(undefined);
  const [, startTransition] = useTransition();

  const caculateLeft = (width: number) => {
    // width: 768px이하 모바일
    if (width < 768) {
      setRight('24px');
    }

    // width: 768px~1024px 태블릿
    if (width >= 768 && width <= 1280) {
      setRight('50px');
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

  const styles: React.CSSProperties = useMemo(() => {
    return {
      right,
    };
  }, [right]);

  return (
    <div
      className={cn('fixed z-[49] bottom-[90px]', {
        hidden: !right,
      })}
      style={styles}
    >
      <Button
        className={cn('rounded-full shadow-sm', {
          'opacity-50': scrollPosition === 'up',
        })}
        data-name="floating-write-action-button"
        ref={$btn}
        size="icon"
        type="button"
        variant="outline"
      >
        <Icons.squarePen />
      </Button>
    </div>
  );
}
