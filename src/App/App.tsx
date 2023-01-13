import { lazy, Suspense, useContext, useEffect, useReducer } from 'react';
import { useFetch } from 'usehooks-ts';
import { ResponseDataProps } from 'utility';

import { Footer, Header, Loader } from 'ui';

import { AppView } from './AppView';
import { MyContext, MyContextValue } from './App.store';

const Ayah = lazy(() => import('./Ayah/Ayah'));

export const App = () => {
  const { state, dispatch } = useContext<MyContextValue>(MyContext);

  const { data } = useFetch<ResponseDataProps>(
    `https://nam.az/api/${state.city}/${state.today}`
  );

  const changeCity = (newCity: number) => {
    dispatch({ type: 'location', payload: newCity });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header changeCity={changeCity} city={state.city} />

      {!data && <Loader />}
      {data && <AppView data={data} />}

      <Suspense fallback={<Loader />}>
        <Ayah />
      </Suspense>

      <Footer />
    </div>
  );
};
