'use client';
import React from 'react';
import { isBrowser } from '../utils/assertion';

export function useIsHydrating(queryString: string) {
  const [isHydrating] = React.useState(
    () => isBrowser && Boolean(document.querySelector(queryString)),
  );
  return isHydrating;
}
