import React from 'react';
import MainLayout from '~/components/layout/main-layout';
import Sidebar from '~/components/layout/sidebar';

interface LayoutProps {
  children: React.ReactNode;
}
export default function Layout({ children }: LayoutProps) {
  return <MainLayout sidebar={<Sidebar />}>{children}</MainLayout>;
}
