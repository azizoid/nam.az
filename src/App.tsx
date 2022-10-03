import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useLocalStorage,
  percentageCounter,
  selectCity,
  fetchData,
  ResponseDataProps,
} from 'utility';

import {
  Header,
  Progress,
  PrayerList,
  PrayerListStill,
  Loader,
  Footer,
  Location,
} from 'components';

import {
  format,
  formatDistanceStrict,
  parse,
  getDayOfYear,
  isLeapYear,
} from 'date-fns';

import az from 'date-fns/locale/az';

import { PrayerProps } from 'components';

const Ayah = lazy(() => import('components/Ayah/Ayah'));

const newDate = new Date();
const today = getDayOfYear(newDate) + (isLeapYear(newDate) ? 0 : 1);

export const App = (): JSX.Element => {
  const [city, setCity] = useLocalStorage('city', 1);

  const [prayers, setPrayers] = useState([
    { id: 1, time: '-:-', rakat: 2, ago: '', title: 'Sübh namazı' },
    { id: 2, time: '-:-', rakat: 0, ago: '', title: 'Gün çıxır' },
    { id: 3, time: '-:-', rakat: 4, ago: '', title: 'Zöhr namazı' },
    { id: 4, time: '-:-', rakat: 4, ago: '', title: 'Əsr namazı' },
    { id: 5, time: '-:-', rakat: 3, ago: '', title: 'Məğrib namazı' },
    { id: 6, time: '-:-', rakat: 4, ago: '', title: 'İşa namazı' },
  ]);

  const [pref, setPref] = useState({
    location: 'Bakı',
    currentPrayer: -1,
    nowis: format(newDate, 'HH:mm'),
    tarix: '',
    hijri: '',
    today: today,
    progress: 0,
    ramadan: 0,
  });

  const [dd, setDd] = useState(today);

  useEffect(() => {
    fetchData({ city, dd }).then((data: ResponseDataProps) => {
      let currentPrayer = 5;

      setPrayers(prev =>
        prev.map((prayer: PrayerProps, i) => {
          prayer.time = data.prayers[i];

          prayer.ago = formatDistanceStrict(
            newDate,
            parse(data.prayers[i], 'HH:mm', newDate),
            { locale: az, addSuffix: true }
          );

          if (data.prayers[i] < pref.nowis) {
            currentPrayer = i;
          }

          return prayer;
        })
      );

      let progress = 0;

      if (pref.today !== data.dd) {
        currentPrayer = -1;
      } else {
        progress = percentageCounter({
          currentPrayer,
          apiPrayers: data.prayers,
          nowis: pref.nowis,
          newDate,
        });
      }

      setPref(prev => ({
        ...prev,
        progress: progress,
        currentPrayer: currentPrayer,
        location: selectCity(city),
        tarix: data.tarix,
        hijri: data.hijri,
      }));
    });
  }, [city, dd, pref.nowis, pref.today]);

  const changeCity = (v: number): void => {
    const changeCityTo = selectCity(v);
    setPref(prev => ({ ...prev, location: changeCityTo }));
    setDd(today);
    setCity(v);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header changeCity={changeCity} city={city} />

      <div className="align-middle container mx-auto my-10 pb-2">
        <Suspense fallback={<Loader />}>
          <Location
            location={pref.location}
            tarix={pref.tarix}
            hijri={pref.hijri}
            dd={dd}
            changeDd={(v: number) => setDd(v)}
          />

          <Progress bar={pref.progress} />
        </Suspense>

        {pref.today === dd ? (
          <PrayerList
            prayers={prayers}
            currentPrayer={pref.currentPrayer}
            progress={pref.progress}
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
