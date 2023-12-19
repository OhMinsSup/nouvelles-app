/* eslint-disable react/no-unknown-property */
'use client';
import React from 'react';

interface WindowScrollHiddenProps {
  children: React.ReactNode;
}

export default function WindowScrollHidden({
  children,
}: WindowScrollHiddenProps) {
  return (
    <>
      {children}
      <style global jsx>{`
        html {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
