'use client';
import React, { useEffect, useMemo, useState, useTransition } from 'react';
import { useEventListener, useMemoizedFn } from '@nouvelles/react-hooks';
import Link from 'next/link';
import { buttonVariants } from '~/components/ui/button';
import { Icons } from '~/components/icons';
import { cn, optimizeAnimation } from '~/utils/utils';
import { PAGE_ENDPOINTS } from '~/constants/constants';

interface FloatingWriteActionButtonProps {
  scrollPosition?: 'up' | 'down' | 'idle';
}

export default function FloatingWriteActionButton({
  scrollPosition,
}: FloatingWriteActionButtonProps) {
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
      <Link
        className={buttonVariants({
          className: cn('!rounded-full shadow-sm', {
            'opacity-50': scrollPosition === 'up',
          }),
          size: 'icon',
          variant: 'outline',
        })}
        data-name="floating-write-action-button"
        href={PAGE_ENDPOINTS.NEWS.WRITE.ROOT}
      >
        <Icons.squarePen />
      </Link>
    </div>
  );
}
