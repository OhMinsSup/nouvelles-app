import { useBeforeUnload } from './useBeforeUnload';
import { useEventListener } from './useEventListener';
import { useIsHydrating } from './useIsHydrating';
import { useLatest } from './useLatest';
import { useMediaQuery } from './useMediaQuery';
import { useMemoizedFn } from './useMemoizedFn';
import { useUnmount } from './useUnmount';
import { useUpdate } from './useUpdate';
import {
  isBrowser,
  isElement,
  isHTMLElement,
  isRefObject,
} from './browser/assertion';
import { createContext } from './browser/context';
import { applyEventListener } from './browser/add-event-listener';
import {
  getClientHeight,
  getOwnerDocument,
  getOwnerWindow,
  getScrollHeight,
  getScrollTop,
  getWindowScrollTop,
} from './browser/dom';
import { getTargetElement, type BasicTarget } from './browser/utils';

export {
  useBeforeUnload,
  useEventListener,
  useIsHydrating,
  useLatest,
  useMediaQuery,
  useMemoizedFn,
  useUnmount,
  useUpdate,
  isBrowser,
  isElement,
  isHTMLElement,
  isRefObject,
  createContext,
  applyEventListener,
  getClientHeight,
  getOwnerDocument,
  getOwnerWindow,
  getScrollHeight,
  getScrollTop,
  getWindowScrollTop,
  getTargetElement,
  BasicTarget,
};
