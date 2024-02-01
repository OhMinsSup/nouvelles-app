'use client';
import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useMediaQuery } from '@nouvelles/react-hooks';
import WriteDialog from '~/components/write/write-dialog';
import WriteSheet from '~/components/write/write-sheet';
import { PAGE_ENDPOINTS } from '~/constants/constants';

export default function Modal() {
  const pathname = usePathname();
  const router = useRouter();

  const whiteList: string[] = [PAGE_ENDPOINTS.NEWS.WRITE.ROOT];

  const open = whiteList.includes(pathname);

  // 768px 초과 1280px 이하
  const isTablet = useMediaQuery(
    '(min-width: 768px) and (max-width: 1280px)',
    false,
  );

  // 768px 이하
  const isMobile = useMediaQuery('(max-width: 768px)', false);

  const onClose = useCallback(() => {
    router.back();
  }, [router]);

  if (isTablet) {
    return <WriteDialog open={open} onClose={onClose} />;
  }

  if (isMobile) {
    return <WriteSheet open={open} onClose={onClose} />;
  }

  return <> </>;
}
