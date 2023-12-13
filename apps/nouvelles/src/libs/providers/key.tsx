'use client';
/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo, useReducer } from 'react';
import { createContext } from '@nouvelles/react';

enum Action {
  SET_QUERY_KEY = 'SET_QUERY_KEY',
}

interface SetQueryKeyAction {
  type: Action.SET_QUERY_KEY;
  payload: {
    queryKey: string[];
  };
}

type KeyAction = SetQueryKeyAction;

interface KeyState {
  queryKey: string[];
}

interface keyContext extends KeyState {
  setQueryKey: (payload: SetQueryKeyAction['payload']) => void;
  dispatch: React.Dispatch<KeyAction>;
}

const initialState: KeyState = {
  queryKey: [],
};

const [Provider, useKeyContext] = createContext<keyContext>({
  name: 'useKeyContext',
  errorMessage: 'useKeyContext: `context` is undefined.',
  defaultValue: initialState as keyContext,
});

interface Props {
  children: React.ReactNode;
  queryKey?: string[];
}

// eslint-disable-next-line @typescript-eslint/default-param-last
function reducer(state = initialState, action: KeyAction) {
  switch (action.type) {
    case Action.SET_QUERY_KEY:
      return {
        ...state,
        queryKey: action.payload.queryKey,
      };
    default:
      return state;
  }
}

function KeyProvider({ children, queryKey = [] }: Props) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, queryKey });

  const setQueryKey = (payload: SetQueryKeyAction['payload']) => {
    dispatch({
      type: Action.SET_QUERY_KEY,
      payload,
    });
  };

  const actions = useMemo(
    () => ({
      ...state,
      setQueryKey,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { KeyProvider, useKeyContext };
