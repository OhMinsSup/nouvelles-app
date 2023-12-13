'use client';
import { usePathname, useRouter } from 'next/navigation';
import React, { useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '~/components/ui/input';

interface SearchInputProps {
  defaultValue?: string;
}

export default function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [_, startTransition] = useTransition();

  const onChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchParams = new URLSearchParams(window.location.search);

      if (e.target.value) {
        searchParams.set('q', e.target.value);
      } else {
        searchParams.delete('q');
      }

      startTransition(() => {
        router.push(`${pathname}?${searchParams.toString()}`);
      });
    },
    250,
  );

  return (
    <div className="flex w-full flex-col">
      <Input
        defaultValue={defaultValue}
        onChange={onChange}
        placeholder="검색"
        type="search"
      />
    </div>
  );
}
