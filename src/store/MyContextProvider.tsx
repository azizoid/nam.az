import { FC, ReactNode, Reducer, useReducer } from 'react';
import { MyContext } from '../App/App.store';
import {
  ActionProps,
  AppInitialState,
  AppReducer,
  StateProps,
} from '../App/App.reducer';

type MyContextProviderProps = {
  children: ReactNode;
};

export const MyContextProvider: FC<MyContextProviderProps> = ({
  children,
}: MyContextProviderProps) => {
  const [state, dispatch] = useReducer<Reducer<StateProps, ActionProps>>(
    AppReducer,
    AppInitialState
  );

  // useEffect(() => {
  //   console.table(state);
  // }, [state]);

  return (
    <MyContext.Provider value={{ state, dispatch }}>
      {children}
    </MyContext.Provider>
  );
};
