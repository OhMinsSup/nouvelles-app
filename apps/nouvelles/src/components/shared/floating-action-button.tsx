'use client';
import React, { useCallback, useTransition } from 'react';
import { useMediaQuery } from '@nouvelles/react-hooks';
import { SkipRenderOnClient } from '@nouvelles/react-components';
import { Button } from '~/components/ui/button';
import { Icons } from '~/components/icons';

interface InternalFloatingActionButtonProps {
  onScrollToTop: () => void;
}

function InternalFloatingActionButton(
  props: InternalFloatingActionButtonProps,
) {
  const [isPending, startTransition] = useTransition();

  const onScrollToTop = useCallback(() => {
    startTransition(() => {
      props.onScrollToTop();
    });
  }, [props]);

  return (
    <div className="fixed bottom-[10%] left-[5%] z-[1001]">
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

type FloatingActionButtonProps = InternalFloatingActionButtonProps;

export default function FloatingActionButton(props: FloatingActionButtonProps) {
  const isMobile = useMediaQuery('(max-width: 768px)', false);
  return (
    <SkipRenderOnClient shouldRenderOnClient={() => isMobile}>
      <InternalFloatingActionButton {...props} />
    </SkipRenderOnClient>
  );
}
