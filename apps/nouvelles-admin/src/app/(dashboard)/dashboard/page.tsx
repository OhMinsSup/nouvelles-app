'use client';
import { useSession } from 'next-auth/react';
import React from 'react';

export default function Page() {
  const data = useSession();
  console.log(data);
  return <div>Page</div>;
}
