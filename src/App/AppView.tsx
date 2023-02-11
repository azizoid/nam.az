import { Suspense, useContext } from 'react';

import { ResponseDataProps, selectCity, usePrayersData } from 'utility';

import { Loader } from 'ui';

import { Location } from './Location/Location';
import { Progress } from './Progress/Progress';
import { PrayerList } from './PrayerList/PrayerList';
import { PrayerListStill } from './PrayerList/PrayerListStill';
import { MyContext, MyContextValue } from './App.store';
import { today } from './App.reducer';
import { useEffectOnce } from 'usehooks-ts';

type AppViewProps = {
  data: ResponseDataProps;
};

export const AppView = ({ data }: AppViewProps) => {
  const { state, dispatch } = useContext<MyContextValue>(MyContext);

  const { currentPrayer, prayers, progress } = usePrayersData({
    apiPrayers: data.prayers,
    nowis: state.nowis,
    newDate: new Date(),
    today,
    dataDd: data.dd,
  });

  useEffectOnce(() => {
    dispatch({
      type: 'init',
      payload: {
        progress,
        currentPrayer,
        location: selectCity(data.city),
        tarix: data.tarix,
        hijri: data.hijri,
        prayers,
      },
    });
  });

  return (
    <div className="align-middle container mx-auto my-10 pb-2">
      <Suspense fallback={<Loader />}>
        <Location
          location={state.location}
          tarix={state.tarix}
          hijri={state.hijri}
          dd={state.today}
          changeDd={(day: number) =>
            dispatch({ type: 'dayOfTheYear', payload: day })
          }
        />

        <Progress bar={state.progress} />
      </Suspense>

      {state.today === today ? (
        <PrayerList
          prayers={prayers}
          currentPrayer={state.currentPrayer}
          progress={state.progress}
        />
      ) : (
        <PrayerListStill prayers={prayers} />
      )}
    </div>
  );
};
