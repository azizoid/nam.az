import { lazy, Suspense, useReducer } from 'react';
import { useFetch } from 'usehooks-ts';
import { ResponseDataProps } from 'utility';

import { Footer, Header, Loader } from 'ui';

import { AppView } from './AppView';
import { AppInitialState, AppReducer } from './App.reducer';

const Ayah = lazy(() => import('./Ayah/Ayah'));

export const App = () => {
  const [state, dispatch] = useReducer(AppReducer, AppInitialState);

  const { data } = useFetch<ResponseDataProps>(
    `http://localhost:4000/api/${state.city}/${state.today}`
  );

  if (!data) {
    return <Loader />;
  }

  const changeCity = (newCity: number) => {
    dispatch({ type: 'location', payload: newCity });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header changeCity={changeCity} city={state.city} />

      <AppView data={data} />

      <Suspense fallback={<Loader />}>
        <Ayah />
      </Suspense>

      <Footer />
    </div>
  );
};
