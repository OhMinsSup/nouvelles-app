'use client';
import React from 'react';
import { Input } from '~/components/ui/input';
import { Icons } from '~/components/icons';

interface SearchFormProps {
  initialValue?: string;
}

export default function SearchForm({ initialValue }: SearchFormProps) {
  return (
    <form method="get">
      <div className="relative">
        <Icons.search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          autoComplete="off"
          className="pl-8"
          defaultValue={initialValue}
          name="q"
          placeholder="검색어를 입력하세요"
          type="search"
        />
      </div>
    </form>
  );
}
