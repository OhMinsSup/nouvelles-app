'use client';
import type { Row } from '@tanstack/react-table';
import { Button } from '~/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Icons } from '~/components/icons';
import { sendkakaoMsgAction } from '~/services/server/actions/send-kakao-msg.action';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export default function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const onSend = () => {
    sendkakaoMsgAction();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          variant="ghost"
        >
          <Icons.moreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={onSend}>발송하기</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
