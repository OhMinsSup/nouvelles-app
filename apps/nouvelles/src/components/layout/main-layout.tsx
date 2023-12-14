'use client';
import { useMediaQuery } from '@nouvelles/react';
import React from 'react';

interface MainLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export default function MainLayout({ children, sidebar }: MainLayoutProps) {
  const isMobile = useMediaQuery('(max-width: 768px)', false);
  console.log('isMobile', isMobile);
  return (
    <div className="flex h-screen bg-[#f7f9fc]">
      {isMobile ? null : sidebar}
      {children}
    </div>
  );
}
