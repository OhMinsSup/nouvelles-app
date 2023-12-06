"use client";
import type { LucideIcon } from "lucide-react";
import { Icons } from "~/components/icons";
import { PAGE_ENDPOINTS } from "./constants";

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
      href: PAGE_ENDPOINTS.ROOT,
      icon: Icons.home,
    },
    {
      id: "search",
      type: "link",
      title: "Search",
      href: PAGE_ENDPOINTS.SEARCH,
      icon: Icons.search,
    },
  ] as NavItem[],
};
