'use client';
import React, { useCallback } from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { useToast } from '~/components/ui/use-toast';

export default function CopyButton() {
  const { toast } = useToast();
  const [, copyToClipboard] = useCopyToClipboard();

  const onClick = useCallback(async () => {
    await copyToClipboard(location.href);
    toast({
      title: '복사 완료',
      description: '링크가 복사되었습니다!',
    });
  }, [copyToClipboard, toast]);

  return (
    <Button onClick={onClick} size="icon" variant="outline">
      <Icons.link />
    </Button>
  );
}
