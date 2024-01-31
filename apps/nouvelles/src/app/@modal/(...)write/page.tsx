'use client';
import { usePathname } from 'next/navigation';
import WriteDialog from '~/components/write/write-dialog';

export default function Modal() {
  const pathname = usePathname();

  console.log('pathname??', pathname);

  return <WriteDialog open onClose={() => {}} />;
}
