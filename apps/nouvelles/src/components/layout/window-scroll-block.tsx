/* eslint-disable react/no-unknown-property */
'use client';
import React from 'react';

interface WindowScrollBlockProps {
  children: React.ReactNode;
}

export default function WindowScrollBlock({
  children,
}: WindowScrollBlockProps) {
  return (
    <>
      {children}
      <style global jsx>{`
        html,
        body {
          overflow: hidden;
        }

        [data-name='main-layout'] {
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
