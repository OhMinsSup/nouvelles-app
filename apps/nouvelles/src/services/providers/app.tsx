'use client';
/* eslint-disable @typescript-eslint/naming-convention */
import { useMemo, useReducer } from 'react';
import { createContext } from '@nouvelles/react-hooks';

enum Action {
  FORCED_UPDATE = 'FORCED_UPDATE',
  CHANGE_DATA_KEY = 'CHANGE_DATA_KEY',
}

interface ForcedUpdateAction {
  type: Action.FORCED_UPDATE;
}

interface ChangeDataKeyAction {
  type: Action.CHANGE_DATA_KEY;
  payload: {
    dataKey: symbol;
  };
}

type AppAction = ForcedUpdateAction | ChangeDataKeyAction;

interface AppState {
  renderObject: Record<string, any>;
  dataKey: symbol;
}

interface AppContext extends AppState {
  forcedUpdate: () => void;
  changeDataKey: (dataKey: symbol) => void;
  dispatch: React.Dispatch<AppAction>;
}

const initialState: AppState = {
  renderObject: {},
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
        renderObject: {},
      };
    case Action.CHANGE_DATA_KEY:
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
    dispatch({ type: Action.FORCED_UPDATE });
  };

  const changeDataKey = (dataKey: symbol) => {
    dispatch({ type: Action.CHANGE_DATA_KEY, payload: { dataKey } });
  };

  const actions = useMemo(
    () => ({
      ...state,
      forcedUpdate,
      changeDataKey,
      dispatch,
    }),
    [state],
  );

  return <Provider value={actions}>{children}</Provider>;
}

export { AppProvider, useAppContext };
