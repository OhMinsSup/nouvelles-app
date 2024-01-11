'use client';
import React, { useCallback, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';

export default function KakaoAuthButton() {
  const [isPending, startTransition] = useTransition();

  const onKakaoLogin = useCallback(() => {
    startTransition(() => {
      void signIn('kakao');
    });
  }, []);

  const Icon = isPending ? Icons.spinner : Icons.kakao;

  return (
    <Button onClick={onKakaoLogin} type="button" variant="outline">
      <Icon className="mr-2 h-10 w-10" />
      카카오 로그인
    </Button>
  );
}
