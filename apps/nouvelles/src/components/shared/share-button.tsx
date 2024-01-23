'use client';
import { getTargetElement } from '@nouvelles/react';
import { useMemoizedFn } from '@nouvelles/react-hooks';
import React, { useCallback, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { isNullOrUndefined } from '@nouvelles/libs';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { useKakaoContext } from '~/services/providers/kakao';
import {
  type Result,
  sharekakaoTemplateAction,
} from '~/services/server/actions/kakao-template.action';
import { useToast } from '~/components/ui/use-toast';

function InternalShareButton() {
  const { pending } = useFormStatus();
  const $div = useRef<HTMLDivElement>(null);

  const onClick = useCallback(() => {
    const $ele = getTargetElement($div);
    if (!$ele) {
      return;
    }

    const $form = $ele.closest('form');
    if (!$form) {
      return;
    }

    $form.requestSubmit();
  }, []);

  return (
    <Button onClick={onClick} size="icon" type="submit" variant="outline">
      {pending ? <Icons.spinner className="animate-spin" /> : <Icons.share />}
    </Button>
  );
}

interface ShareButtonProps {
  id: number;
}

export default function ShareButton({ id }: ShareButtonProps) {
  const { kakaoSDK } = useKakaoContext();

  const { toast } = useToast();

  const sendKakaoMsgFn = sharekakaoTemplateAction.bind(null, {
    id,
  });

  const [stateBySend, formActionBySend] = useFormState<Result | null>(
    sendKakaoMsgFn,
    null,
  );

  const sharedKakaoMsg = () => {
    if (isNullOrUndefined(stateBySend)) {
      return;
    }

    if (!kakaoSDK) {
      toast({
        title: '카카오톡 SDK가 로드되지 않았습니다.',
        description: '잠시 후 다시 시도해주세요.',
      });
      return;
    }

    const state = stateBySend.data ?? null;
    if (!state) {
      toast({
        title: '카카오톡 공유에 실패했습니다.',
        description: '잠시 후 다시 시도해주세요.',
      });
      return;
    }

    kakaoSDK.Share.sendDefault(state);
  };

  const handler = useMemoizedFn(sharedKakaoMsg);

  useEffect(() => {
    handler();
  }, [stateBySend]);

  return (
    <form action={formActionBySend}>
      <InternalShareButton />
    </form>
  );
}
