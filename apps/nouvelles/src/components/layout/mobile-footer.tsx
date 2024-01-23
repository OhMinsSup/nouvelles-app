'use client';
import { getTargetElement, getWindowScrollTop } from '@nouvelles/react';
import { useEventListener, useMediaQuery } from '@nouvelles/react-hooks';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { optimizeAnimation } from '~/utils/utils';

interface FooterMobileProps {
  children: React.ReactNode;
}

export default function FooterMobile({ children }: FooterMobileProps) {
  const isMobile = useMediaQuery('(max-width: 768px)', false);
  console.log('isMobile!!!', isMobile);
  if (!isMobile) {
    return null;
  }
  return <FooterMobile.Internal>{children}</FooterMobile.Internal>;
}

FooterMobile.Internal = function Item({ children }: FooterMobileProps) {
  const ref = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const prevScrollTop = useRef(0);

  const scrollMethod = optimizeAnimation(() => {
    const scrollTop = getWindowScrollTop();

    // 현재 스크롤이 내려가는지 올라가는지 판단
    const isScrollDown = scrollTop > prevScrollTop.current;

    // 스크롤이 내려가는 경우
    if (isScrollDown) {
      // 헤더가 사라지는 경우
      if (scrollTop > height) {
        setTranslateY(height);
      } else {
        setTranslateY(scrollTop);
      }
    } else {
      // 스크롤이 올라가는 경우
      setTranslateY(0);
    }

    prevScrollTop.current = scrollTop;
  });

  useEventListener('scroll', scrollMethod);

  useEffect(() => {
    const $ele = getTargetElement(ref);
    if (!$ele) return;
    const bounding = $ele.getBoundingClientRect();
    setHeight(bounding.height + 10);
  }, []);

  const styles: React.CSSProperties = useMemo(() => {
    return {
      transform: `translateY(${translateY}px)`,
    };
  }, [translateY]);

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
