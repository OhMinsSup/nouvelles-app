import React from "react";
import MainLayout from "apps/nouvelles/src/components/layout/main-layout";

interface Props {
  children: React.ReactNode;
}
export default async function Layout({ children }: Props) {
  return <MainLayout>{children}</MainLayout>;
}
