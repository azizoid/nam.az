import { Suspense, useEffect, useReducer } from 'react';
import { getDayOfYear, isLeapYear } from 'date-fns';

import { usePrayersData, ResponseDataProps, selectCity } from 'utility';

import { Loader } from 'ui';

import { Location } from './Location/Location';
import { Progress } from './Progress/Progress';
import { PrayerList } from './PrayerList/PrayerList';
import { PrayerListStill } from './PrayerList/PrayerListStill';
import { AppInitialState, AppReducer } from './App.reducer';

const newDate = new Date();
const today = getDayOfYear(newDate) + (isLeapYear(newDate) ? 0 : 1);

type AppViewProps = {
  data: ResponseDataProps;
};

export const AppView = ({ data }: AppViewProps) => {
  const [state, dispatch] = useReducer(AppReducer, AppInitialState);

  const { currentPrayer, prayers, progress } = usePrayersData({
    apiPrayers: data.prayers,
    nowis: state.nowis,
    newDate,
    today,
    dataDd: data.dd,
  });

  useEffect(() => {
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
  }, [data]);

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
