"use client";
import type { LucideIcon } from "lucide-react";
import { Icons } from "~/components/icons";

export type NavItem = {
  id: "home" | "search" | "thread" | "activity" | "myPage";
  type: "link" | "myPage";
  title: string;
  href?: string;
  disabled?: boolean;
  icon: LucideIcon;
};

export const NAV_CONFIG = {
  mainNav: [
    {
      id: "home",
      type: "link",
      title: "Home",
      href: "/",
      icon: Icons.home,
    },
    {
      id: "search",
      type: "link",
      title: "Search",
      href: "/search",
      icon: Icons.search,
    },
  ] as NavItem[],
};
