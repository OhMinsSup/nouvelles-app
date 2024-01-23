'use client';
import { getWindowScrollTop } from '@nouvelles/react';
import { useEventListener } from '@nouvelles/react-hooks';
import React, { useMemo, useRef, useState } from 'react';
import { optimizeAnimation } from '~/utils/utils';

interface FooterMobileProps {
  children: React.ReactNode;
}

export default function FooterMobile({ children }: FooterMobileProps) {
  return <FooterMobile.Internal>{children}</FooterMobile.Internal>;
}

FooterMobile.Internal = function Item({ children }: FooterMobileProps) {
  const ref = useRef<HTMLElement>(null);

  const [opacity, setOpacity] = useState(1);

  const prevScrollTop = useRef(0);

  const scrollMethod = optimizeAnimation(() => {
    const scrollTop = getWindowScrollTop();

    // 현재 스크롤이 내려가는지 올라가는지 판단
    const isScrollDown = scrollTop > prevScrollTop.current;

    // 스크롤이 내려가면 서서히 반투명하게 만들기
    if (isScrollDown) {
      // 0.25ms 마다 0.05씩 감소해서 0.5가 되면 멈추기
      setOpacity(0.6);
    } else {
      setOpacity(1);
    }

    prevScrollTop.current = scrollTop;
  });

  useEventListener('scroll', scrollMethod);

  const styles: React.CSSProperties = useMemo(() => {
    return {
      opacity,
    };
  }, [opacity]);

  return (
    <nav
      className="md:hidden sticky bottom-0 z-40 flex w-full items-center justify-around border-t bg-white py-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
      data-name="mobile-footer"
      ref={ref}
      style={styles}
    >
      {children}
    </nav>
  );
};
