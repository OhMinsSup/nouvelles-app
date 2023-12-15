import React from 'react';
import ToogleThemeButton from './toggle-theme-button';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';

export default function MainHeader() {
  return (
    <div className="relative z-20 flex w-full border-b py-4 backdrop-blur-md">
      <div className="w-full mx-auto grid min-w-full grid-cols-12 items-center gap-4 px-4">
        <div className="relative z-20 col-span-4 flex flex-row items-start justify-start">
          <Button
            className="mr-2 justify-center items-center"
            size="sm"
            type="button"
            variant="ghost"
          >
            <Icons.alignJustify />
          </Button>
        </div>
        <div className="flex col-span-8 flex-row items-center justify-end gap-5">
          <div className="flex gap-2">
            <ToogleThemeButton />
          </div>
        </div>
      </div>
    </div>
  );
}
