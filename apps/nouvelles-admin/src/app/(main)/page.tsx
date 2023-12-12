'use client';
import React from 'react';

export default function Page() {
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
