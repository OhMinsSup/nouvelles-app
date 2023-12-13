import { type ClassValue, clsx } from 'clsx';
import noop from 'lodash-es/noop';
import { twMerge } from 'tailwind-merge';
import { isEmpty, isNull, isUndefined } from '@nouvelles/libs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function optimizeAnimation(callback: () => void) {
  let ticking = false;

  return () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback();
        ticking = false;
      });
    }
  };
}

export const createSearchParams = (params?: Record<string, any>) => {
  const searchParams = new URLSearchParams();
  if (!params || isEmpty(params)) return searchParams;

  Object.keys(params).forEach((key) => {
    if (params[key] !== undefined || params[key] !== null) {
      if (Array.isArray(params[key])) {
        searchParams.append(key, params[key].join(','));
      } else {
        if (isUndefined(params[key]) || isNull(params[key])) return;
        const hasToString = Object.prototype.hasOwnProperty.call(
          params[key],
          'toString',
        );
        if (hasToString) {
          searchParams.append(key, params[key].toString());
        } else {
          searchParams.append(key, params[key]);
        }
      }
    }
  });

  return searchParams;
};

export const delayPromise = (ms: number) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let rejectFn: (reason?: any) => void = noop;
  const promise = new Promise((resolve, reject) => {
    timer = setTimeout(resolve, ms);
    rejectFn = reject;
  });

  return {
    promise,
    cancel: () => {
      clearTimeout(timer);
      rejectFn(new Error('Cancelled'));
    },
    close: () => {
      clearTimeout(timer);
      timer = undefined;
      rejectFn = noop;
    },
  };
};
