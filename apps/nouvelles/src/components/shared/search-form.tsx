'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '~/components/ui/input';

export default function SearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const q = searchParams.get('q') ?? undefined;

  const onChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextSearchParams = new URLSearchParams(window.location.search);

      if (e.target.value) {
        nextSearchParams.set('q', e.target.value);
      } else {
        nextSearchParams.delete('q');
      }

      startTransition(() => {
        router.push(`${pathname}?${nextSearchParams.toString()}`);
      });
    },
    250,
  );

  return (
    <form className="flex flex-1 flex-row items-stretch relative" method="get">
      <Input
        autoComplete="off"
        defaultValue={q}
        name="q"
        onChange={onChange}
        placeholder="검색어를 입력하세요"
        type="text"
      />
    </form>
  );
}
