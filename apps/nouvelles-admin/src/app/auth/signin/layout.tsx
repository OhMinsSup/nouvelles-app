import { redirect } from 'next/navigation';
import React from 'react';
import { PAGE_ENDPOINTS } from '~/constants/constants';
import { getSession } from '~/services/server/auth';

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Layout({ children }: LayoutProps) {
  const auth = await getSession();

  if (auth) {
    redirect(PAGE_ENDPOINTS.DASHBOARD.ROOT);
  }

  console.log(auth);
  return <>{children}</>;
}
