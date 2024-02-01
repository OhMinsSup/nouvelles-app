import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '~/components/ui/sheet';
import WriteForm from '~/components/write/write-form';

interface WriteSheetProps {
  open: boolean;
  onClose: () => void;
}

export default function WriteSheet({ open, onClose }: WriteSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-full">
        <SheetHeader className="text-left">
          <SheetTitle>새로운 글쓰기</SheetTitle>
        </SheetHeader>
        <WriteForm isDialog={true} />
      </SheetContent>
    </Sheet>
  );
}
