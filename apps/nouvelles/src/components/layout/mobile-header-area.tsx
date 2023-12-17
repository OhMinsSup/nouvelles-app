import React from 'react';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '~/components/ui/sheet';
import Menu from '~/components/layout/menu';
import NavigationArea from './navigation-area';

export default function MobileHeaderArea() {
  return (
    <div className="relative z-20 flex w-full border-b py-4 backdrop-blur-md">
      <div className="w-full mx-auto grid min-w-full grid-cols-12 items-center gap-4 px-4">
        <div className="relative z-20 col-span-4 flex flex-row items-start justify-start">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="mr-2 justify-center items-center"
                size="sm"
                type="button"
                variant="ghost"
              >
                <Icons.alignJustify />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[250px]" side="left">
              <SheetHeader className="px-2 py-3">
                <SheetTitle>메뉴</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
                <NavigationArea type="desktop" />
              </div>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex col-span-8 flex-row items-center justify-end gap-5">
          <div className="flex gap-2">
            <Button variant="ghost">
              <Icons.setting />
            </Button>
            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
}
