'use client';
import React from 'react';
import { depsAreSame } from '../utils/depsAreSame';
import { type BasicTarget, getTargetElement } from '../utils/dom';
import { useUnmount } from '../hooks/useUnmount';
import { isBrowser } from '../utils/assertion';

const createEffectWithTarget = (
  useEffectType: typeof React.useEffect | typeof React.useLayoutEffect,
) => {
  const useEffectWithTarget = (
    effect: React.EffectCallback,
    deps: React.DependencyList,
    target: BasicTarget<any> | BasicTarget<any>[],
  ) => {
    const hasInitRef = React.useRef(false);

    const lastElementRef = React.useRef<(Element | null)[]>([]);
    const lastDepsRef = React.useRef<React.DependencyList>([]);

    const unLoadRef = React.useRef<
      ReturnType<React.EffectCallback> | undefined
    >();

    useEffectType(() => {
      const targets = Array.isArray(target) ? target : [target];
      const els = targets.map(
        (item) => getTargetElement(item) as Element | null,
      );

      // init run
      if (!hasInitRef.current) {
        hasInitRef.current = true;
        lastElementRef.current = els;
        lastDepsRef.current = deps;

        unLoadRef.current = effect();
        return;
      }

      if (
        els.length !== lastElementRef.current.length ||
        !depsAreSame(els, lastElementRef.current) ||
        !depsAreSame(deps, lastDepsRef.current)
      ) {
        unLoadRef.current?.();

        lastElementRef.current = els;
        lastDepsRef.current = deps;
        unLoadRef.current = effect();
      }
    });

    useUnmount(() => {
      unLoadRef.current?.();
      // for react-refresh
      hasInitRef.current = false;
    });
  };

  return useEffectWithTarget;
};

export const useEffectWithTarget = createEffectWithTarget(React.useEffect);

export const useLayoutEffectWithTarget = createEffectWithTarget(
  React.useLayoutEffect,
);

export const useIsomorphicLayoutEffectWithTarget = isBrowser
  ? useLayoutEffectWithTarget
  : useEffectWithTarget;
