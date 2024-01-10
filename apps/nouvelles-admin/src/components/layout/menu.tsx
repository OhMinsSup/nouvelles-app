'use client';
import React, { useCallback, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Icons } from '~/components/icons';
import { Button } from '~/components/ui/button';
import { cn } from '~/utils/utils';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

export default function Menu() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();

  const onClick = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [setTheme, theme]);

  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger
        className={cn(
          'hover:text-foreground leading-tight',
          open ? 'text-foreground' : 'text-foreground/60',
        )}
      >
        <Avatar>
          <AvatarImage />
          <AvatarFallback>N</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" sideOffset={20}>
        <DropdownMenuItem onClick={onClick}>
          <Button onClick={onClick} size="xxs" type="button" variant="ghost">
            {theme === 'light' ? <Icons.moon /> : <Icons.sun />}
            <span className="ml-2">
              {theme === 'light' ? '다크 모드' : '라이트 모드'}
            </span>
          </Button>
        </DropdownMenuItem>
        {/* <DropdownMenuSeparator /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
