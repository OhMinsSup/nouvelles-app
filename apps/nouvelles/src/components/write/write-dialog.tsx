import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

interface WriteDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function WriteDialog({ open, onClose }: WriteDialogProps) {
  console.log('WriteDialog');
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>새로운 글쓰기</DialogTitle>
        </DialogHeader>
        <>Wahat</>
      </DialogContent>
    </Dialog>
  );
}
