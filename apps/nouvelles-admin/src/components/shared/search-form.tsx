'use client';
import { getTargetElement } from '@nouvelles/react';
import { usePathname, useRouter } from 'next/navigation';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '~/components/ui/input';

interface SearchFormProps {
  initialValue?: string;
}

export default function SearchForm({ initialValue }: SearchFormProps) {
  const [keyword, setKeyword] = useState(initialValue ?? '');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const $ipt = useRef<HTMLInputElement>(null);

  const callback = useDebouncedCallback(
    (value: string) => {
      const nextSearchParams = new URLSearchParams(window.location.search);
      if (value) {
        nextSearchParams.set('q', value);
      } else {
        nextSearchParams.delete('q');
      }

      startTransition(() => {
        router.push(`${pathname}?${nextSearchParams.toString()}`, {
          scroll: false,
        });
      });
    },
    500,
    {
      trailing: true,
    },
  );

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextKeyword = e.target.value;
      setKeyword(nextKeyword);
      callback(nextKeyword);
    },
    [callback],
  );

  useEffect(() => {
    if (!isPending) {
      const element = getTargetElement($ipt);
      element?.focus();
    }
  }, [isPending]);

  return (
    <form className="flex flex-1 flex-row items-stretch relative" method="get">
      <Input
        autoComplete="off"
        name="q"
        onChange={onChange}
        placeholder="검색어를 입력하세요"
        ref={$ipt}
        type="search"
        value={keyword}
      />
    </form>
  );
}
