import React from 'react';
import HeaderMobile from '~/components/layout/mobile-header';
import FooterMobile from '~/components/layout/mobile-footer';
import { cn } from '~/utils/utils';

interface MainLayoutProps {
  tabletSidebar?: React.ReactNode;
  desktopSidebar?: React.ReactNode;
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
  mobileHeader?: React.ReactNode;
  mobileFooter?: React.ReactNode;
  className?: string;
}

export default function MainLayout({
  children,
  tabletSidebar,
  desktopSidebar,
  rightSidebar,
  mobileFooter,
  mobileHeader,
  className,
}: MainLayoutProps) {
  return (
    <>
      {mobileHeader ? <HeaderMobile>{mobileHeader}</HeaderMobile> : null}
      <div className={cn('flex h-screen', className)} data-name="main-layout">
        <div className="hidden md:block xl:hidden" data-name="tablet-sidebar">
          {tabletSidebar}
        </div>
        <div className="hidden xl:block" data-name="desktop-sidebar">
          {desktopSidebar}
        </div>
        {children}
        <div className="hidden xl:block" data-name="right-sidebar">
          {rightSidebar}
        </div>
      </div>
      {mobileFooter ? <FooterMobile>{mobileFooter}</FooterMobile> : null}
    </>
  );
}
