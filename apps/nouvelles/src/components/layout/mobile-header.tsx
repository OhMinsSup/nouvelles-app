'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { getTargetElement, getWindowScrollTop } from '@nouvelles/react';
import { useEventListener } from '@nouvelles/react-hooks';
import { optimizeAnimation } from '~/utils/utils';

interface HeaderMobileProps {
  children: React.ReactNode;
}

export default function HeaderMobile({ children }: HeaderMobileProps) {
  return <HeaderMobile.Internal>{children}</HeaderMobile.Internal>;
}

HeaderMobile.Internal = function Item({ children }: HeaderMobileProps) {
  const ref = useRef<HTMLElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [height, setHeight] = useState(0);

  const prevScrollTop = useRef(0);

  const scrollMethod = optimizeAnimation(() => {
    const scrollTop = getWindowScrollTop();

    // 현재 스크롤이 내려가는지 올라가는지 판단
    const isScrollDown = scrollTop > prevScrollTop.current;

    // 스크롤이 내려가는 경우
    if (isScrollDown) {
      // 헤더가 사라지는 경우
      if (scrollTop > height) {
        setTranslateY(-height);
      } else {
        setTranslateY(-scrollTop);
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
    <header
      className="sticky top-0 z-40 block md:hidden"
      data-name="mobile-header"
      ref={ref}
      style={styles}
    >
      {children}
    </header>
  );
};
