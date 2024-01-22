'use client';
import React, { useCallback, useMemo, useTransition } from 'react';
import { useMediaQuery } from '@nouvelles/react-hooks';
import { Button } from '~/components/ui/button';
import { Icons } from '~/components/icons';

interface FloatingScrollTopActionButtonProps {
  onScrollToTop: () => void;
}

function FloatingScrollTopActionButton(
  props: FloatingScrollTopActionButtonProps,
) {
  const isMobile = useMediaQuery('(max-width: 640px)', false);
  const isTablet = useMediaQuery('(max-width: 768px)', false);
  const isDesktop = useMediaQuery('(min-width: 1024px)', false);

  const [isPending, startTransition] = useTransition();

  const onScrollToTop = useCallback(() => {
    startTransition(() => {
      props.onScrollToTop();
    });
  }, [props]);

  const left = useMemo(() => {
    if (isMobile) {
      return '3.3%';
    }

    if (isTablet) {
      return '2.5%';
    }

    // if (isDesktop) {
    //   return '35.8%';
    // }

    return '18%';
  }, [isMobile, isTablet, isDesktop]);

  const styles: React.CSSProperties = useMemo(() => {
    return {
      left,
    };
  }, [left]);

  return (
    <div className="fixed bottom-[10%] z-[1001]" style={styles}>
      <Button
        className="rounded-full shadow-md"
        disabled={isPending}
        onClick={onScrollToTop}
        size="icon"
        type="button"
        variant="outline"
      >
        <Icons.arrowUp />
      </Button>
    </div>
  );
}

function FloatingWriteActionButton() {
  return null;
}

type FloatingActionButtonProps = FloatingScrollTopActionButtonProps & {
  children: React.ReactNode;
};

export default function FloatingActionButtons(
  props: FloatingActionButtonProps,
) {
  return (
    <>
      <FloatingScrollTopActionButton onScrollToTop={props.onScrollToTop} />
      {props.children}
      <FloatingWriteActionButton />
    </>
  );
}
