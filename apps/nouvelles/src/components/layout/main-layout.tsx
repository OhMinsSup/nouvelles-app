import React from 'react';
import HeaderMobile from '~/components/layout/mobile-header';
import FooterMobile from '~/components/layout/mobile-footer';

interface MainLayoutProps {
  tabletSidebar?: React.ReactNode;
  desktopSidebar?: React.ReactNode;
  children: React.ReactNode;
  rightSidebar?: React.ReactNode;
  mobileHeader?: React.ReactNode;
  mobileFooter?: React.ReactNode;
}

export default function MainLayout({
  children,
  tabletSidebar,
  desktopSidebar,
  rightSidebar,
  mobileFooter,
  mobileHeader,
}: MainLayoutProps) {
  return (
    <>
      {mobileHeader ? <HeaderMobile>{mobileHeader}</HeaderMobile> : null}
      <div className="flex h-screen">
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
