'use client';
import React from 'react';
import ResourceLoader from '~/utils/resource';
import { createContext } from '@nouvelles/react-hooks';
import { ClientOnly } from '@nouvelles/react-components';
import { CardListHeaderSkeleton } from '~/components/shared/card-list';

type KakaoAction = {};

interface KakaoState {
  kakaoSDK: typeof window.Kakao | null;
}

interface KakaoContext extends KakaoState {
  dispatch: React.Dispatch<KakaoAction>;
}

const initialState: KakaoState = {
  kakaoSDK: null,
};

const [Provider, useKakaoContext] = createContext<KakaoContext>({
  name: 'useKakaoContext',
  errorMessage: 'useKakaoContext: `context` is undefined.',
  defaultValue: initialState as KakaoContext,
});

// eslint-disable-next-line @typescript-eslint/default-param-last
function reducer(state = initialState, action: KakaoAction) {
  return state;
}

interface KakaoProviderProps {
  children: React.ReactNode;
  initialKakaoSDK: typeof window.Kakao | null;
}

function KakaoProvider({ children, initialKakaoSDK }: KakaoProviderProps) {
  const [state, dispatch] = React.useReducer(
    reducer,
    Object.assign({}, initialState, { kakaoSDK: initialKakaoSDK }),
  );

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

  resource.load();
  resource.read();

  const kakaoSDK = resource.get() ?? null;

  return <KakaoProvider initialKakaoSDK={kakaoSDK}>{children}</KakaoProvider>;
}

interface KakaoSDKLoaderProps extends InternalKakaoIntializeProps {}

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
