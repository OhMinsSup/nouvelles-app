'use client';
import React from 'react';
import { createContext } from '@nouvelles/react-hooks';
import { ClientOnly } from '@nouvelles/react-components';
import ResourceLoader from '~/utils/resource';
import { CardListHeaderSkeleton } from '~/components/skeleton/card-list';

interface KakaoState {
  kakaoSDK: typeof window.Kakao | null;
}

interface KakaoContext extends KakaoState {
  dispatch: React.DispatchWithoutAction;
}

const initialState: KakaoState = {
  kakaoSDK: null,
};

const [Provider, useKakaoContext] = createContext<KakaoContext>({
  name: 'useKakaoContext',
  errorMessage: 'useKakaoContext: `context` is undefined.',
  defaultValue: initialState as KakaoContext,
});

function reducer(state = initialState) {
  return state;
}

interface KakaoProviderProps {
  children: React.ReactNode;
  initialKakaoSDK: typeof window.Kakao | null;
}

function KakaoProvider({ children, initialKakaoSDK }: KakaoProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    ...initialState,
    kakaoSDK: initialKakaoSDK,
  });

  const actions = React.useMemo(
    () => ({
      ...state,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

interface InternalKakaoIntializeProps {
  children: React.ReactNode;
  clientId: string;
}

function InternalKakaoIntialize({
  children,
  clientId,
}: InternalKakaoIntializeProps) {
  const resource = ResourceLoader(clientId, () => {
    return new Promise((resolve) => {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(clientId);
      }
      window.Kakao.isInitialized() ? resolve(window.Kakao) : resolve(null);
    });
  });

  void resource.load();
  resource.read();

  const kakaoSDK = resource.get() ?? null;

  return <KakaoProvider initialKakaoSDK={kakaoSDK}>{children}</KakaoProvider>;
}

type KakaoSDKLoaderProps = InternalKakaoIntializeProps;

function KakaoSDKLoader({ children, clientId }: KakaoSDKLoaderProps) {
  return (
    <ClientOnly fallback={<CardListHeaderSkeleton type="today" />}>
      <React.Suspense fallback={<CardListHeaderSkeleton type="today" />}>
        <InternalKakaoIntialize clientId={clientId}>
          {children}
        </InternalKakaoIntialize>
      </React.Suspense>
    </ClientOnly>
  );
}

export { KakaoSDKLoader, useKakaoContext };
