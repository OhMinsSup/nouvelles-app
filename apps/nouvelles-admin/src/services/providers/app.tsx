'use client';
/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo, useReducer } from 'react';
import { createContext } from '@nouvelles/react-hooks';

enum Action {
  FORCED_UPDATE = 'FORCED_UPDATE',
}

interface ForcedUpdateAction {
  type: Action.FORCED_UPDATE;
  payload: {
    dataKey: symbol;
  };
}

type AppAction = ForcedUpdateAction;

interface AppState {
  dataKey: symbol;
}

interface AppContext extends AppState {
  forcedUpdate: () => void;
  dispatch: React.Dispatch<AppAction>;
}

const initialState: AppState = {
  dataKey: Symbol('dataKey'),
};

const [Provider, useAppContext] = createContext<AppContext>({
  name: 'useAppContext',
  errorMessage: 'useAppContext: `context` is undefined.',
  defaultValue: initialState as AppContext,
});

interface AppProviderProps {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/default-param-last
function reducer(state = initialState, action: AppAction) {
  switch (action.type) {
    case Action.FORCED_UPDATE:
      return {
        ...state,
        dataKey: action.payload.dataKey,
      };
    default:
      return state;
  }
}

function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const forcedUpdate = () => {
    const dataKey = Symbol('dataKey');
    dispatch({ type: Action.FORCED_UPDATE, payload: { dataKey } });
  };

  const actions = useMemo(
    () => ({
      ...state,
      forcedUpdate,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { AppProvider, useAppContext };
