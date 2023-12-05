import Link from "next/link";
import React from "react";
import { Icons } from "~/components/icons";
import { buttonVariants } from "~/components/ui/button";
import { PAGE_ENDPOINTS } from "~/constants/constants";
import { cn } from "~/utils/utils";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href={PAGE_ENDPOINTS.ROOT}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          뒤로가기
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-8 w-8" />
        </div>
        {children}
      </div>
    </div>
  );
}
