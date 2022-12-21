import { lazy, Suspense, useEffect, useReducer, useState } from 'react';
import {
  fetchData,
  percentageCounter,
  ResponseDataProps,
  selectCity,
  useLocalStorage,
} from 'utility';

import { Footer, Header, Loader } from 'ui';

import {
  formatDistanceStrict,
  getDayOfYear,
  isLeapYear,
  parse,
} from 'date-fns';

import az from 'date-fns/locale/az';

import { Location } from './Location/Location';
import { Progress } from './Progress/Progress';
import type { PrayerProps } from './PrayerList/Prayer';
import { PrayerList } from './PrayerList/PrayerList';
import { PrayerListStill } from './PrayerList/PrayerListStill';
import { AppInitialState, AppReducer } from './App.reducer';

const Ayah = lazy(() => import('./Ayah/Ayah'));

const newDate = new Date();
const today = getDayOfYear(newDate) + (isLeapYear(newDate) ? 0 : 1);

export const App = () => {
  const [localStorageCity, setLocalStorageCity] = useLocalStorage<
    number | undefined
  >('city', undefined);

  const [state, dispatch] = useReducer(AppReducer, AppInitialState);

  const [prayers, setPrayers] = useState([
    { id: 1, time: '-:-', rakat: 2, ago: '', title: 'Sübh namazı' },
    { id: 2, time: '-:-', rakat: 0, ago: '', title: 'Gün çıxır' },
    { id: 3, time: '-:-', rakat: 4, ago: '', title: 'Zöhr namazı' },
    { id: 4, time: '-:-', rakat: 4, ago: '', title: 'Əsr namazı' },
    { id: 5, time: '-:-', rakat: 3, ago: '', title: 'Məğrib namazı' },
    { id: 6, time: '-:-', rakat: 4, ago: '', title: 'İşa namazı' },
  ]);

  useEffect(() => {
    if (state.city) {
      setLocalStorageCity(state.city);
    }
  }, [state.city]);

  useEffect(() => {
    if (!localStorageCity) {
      return;
    }

    fetchData({ city: localStorageCity, dd: state.today })
      .then((data: ResponseDataProps) => {
        let currentPrayer = 5;

        setPrayers(prev =>
          prev.map((prayer: PrayerProps, i) => {
            prayer.time = data.prayers[i];

            prayer.ago = formatDistanceStrict(
              newDate,
              parse(data.prayers[i], 'HH:mm', newDate),
              { locale: az, addSuffix: true }
            );

            if (data.prayers[i] < state.nowis) {
              currentPrayer = i;
            }

            return prayer;
          })
        );

        let progress = 0;

        if (today !== data.dd) {
          currentPrayer = -1;
        } else {
          progress = percentageCounter({
            currentPrayer,
            apiPrayers: data.prayers,
            nowis: state.nowis,
            newDate,
          });
        }

        dispatch({
          type: 'init',
          payload: {
            progress,
            currentPrayer,
            location: selectCity(data.city),
            tarix: data.tarix,
            hijri: data.hijri,
          },
        });
      })
      .catch(error => {
        // console.error(error);
      });
  }, [localStorageCity, state.today]);

  const changeCity = (v: number): void => {
    dispatch({ type: 'location', payload: v });
  };

  // useEffect(() => {
  //   console.table(state);
  // }, [state]);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header changeCity={changeCity} city={localStorageCity} />

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

        <Suspense fallback={<Loader />}>
          <Ayah />
        </Suspense>
      </div>

      <Footer />
    </div>
  );
};
