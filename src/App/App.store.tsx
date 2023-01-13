import { createContext, Dispatch } from 'react';
import { ActionProps, AppInitialState, StateProps } from './App.reducer';

export type MyContextValue = {
  state: StateProps;
  dispatch: Dispatch<ActionProps>;
};

export const MyContext = createContext<MyContextValue>({
  state: AppInitialState,
  dispatch: () => {},
});
