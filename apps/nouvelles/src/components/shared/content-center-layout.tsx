import React from 'react';

interface ContentCenterLayoutProps {
  children: React.ReactNode;
}

export default function ContentCenterLayout({
  children,
}: ContentCenterLayoutProps) {
  return (
    <div className="h-[85vh]">
      <div className="flex h-full items-center justify-center">{children}</div>
    </div>
  );
}
