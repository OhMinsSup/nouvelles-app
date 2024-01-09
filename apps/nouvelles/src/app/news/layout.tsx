import React from 'react';
import WindowScrollBlock from '~/components/layout/window-scroll-block';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return <WindowScrollBlock>{children}</WindowScrollBlock>;
}
