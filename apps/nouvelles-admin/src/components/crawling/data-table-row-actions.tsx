'use client';
import type { Row } from '@tanstack/react-table';
import { useFormState, useFormStatus } from 'react-dom';
import { useCallback, useEffect, useRef } from 'react';
import { getTargetElement } from '@nouvelles/react';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Icons } from '~/components/icons';
import {
  sendkakaoMsgAction,
  type Result,
} from '~/services/server/actions/send-kakao-msg.action';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export default function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const id = row.getValue<number>('id');
  const sendKakaoMsgFn = sendkakaoMsgAction.bind(null, {
    id,
  });

  const [stateBySend, formActionBySend] = useFormState<Result | null>(
    sendKakaoMsgFn,
    null,
  );

  useEffect(() => {
    if (stateBySend && stateBySend.ok) {
      console.log('ok');
    }
  }, [stateBySend]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          variant="ghost"
        >
          <Icons.moreHorizontal className="h-4 w-4" />
          <span className="sr-only">메뉴 열기</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <form action={formActionBySend}>
          <SendButton />
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SendButton() {
  const { pending } = useFormStatus();
  const $div = useRef<HTMLDivElement>(null);

  const onClickSend = useCallback(() => {
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
    <DropdownMenuItem disabled={pending} onClick={onClickSend} ref={$div}>
      {pending ? <Icons.spinner className="animate-spin h-4 w-4" /> : null}
      발송하기
    </DropdownMenuItem>
  );
}
