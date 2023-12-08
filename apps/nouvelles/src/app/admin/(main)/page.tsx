'use client';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Page({ children }: Props) {
  return (
    <div
      onClick={() => {
        try {
          fetch('/api/send', {
            method: 'POST',
          });
        } catch (error) {
          console.log(error);
        }
      }}
    >
      Page
    </div>
  );
}
