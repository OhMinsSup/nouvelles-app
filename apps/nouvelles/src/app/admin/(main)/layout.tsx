import React from "react";
import { redirect } from "next/navigation";
import { PAGE_ENDPOINTS } from "apps/nouvelles/src/constants/constants";
import { Role, getSession, isAuthorized } from "apps/nouvelles/src/server/auth";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const session = await getSession();
  if (!isAuthorized(session, Role.admin)) {
    redirect(PAGE_ENDPOINTS.ADMIN.AUTH.SIGNIN);
  }

  return <div>{children}</div>;
}
