'use client';
import { type BasicTarget, getTargetElement } from '@nouvelles/react';
import { useIsomorphicLayoutEffectWithTarget } from './createEffectWithTarget';
import { useLatest } from './useLatest';

export function useMutationObserver(
  callback: MutationCallback,
  target: BasicTarget,
  options: MutationObserverInit = {},
) {
  const callbackRef = useLatest(callback);

  useIsomorphicLayoutEffectWithTarget(
    () => {
      const element = getTargetElement(target);
      if (!element) {
        return;
      }
      const observer = new MutationObserver(callbackRef.current);
      observer.observe(element, options);
      return () => {
        observer.disconnect();
      };
    },
    [options],
    target,
  );
}
