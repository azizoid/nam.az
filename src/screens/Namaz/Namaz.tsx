import { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';

// import { ResponseDataProps, selectCity, usePrayersData } from 'utility';

import { Location } from './Location/Location';
import { Loader } from '@/components';
import { PrayerData } from './Namaz.entity';
import { selectCity } from '@/utilities';
import { setNamazData } from '@/store/namazSlice';
import { getDayOfYear } from 'date-fns';
import { PrayerList } from './PrayerList/PrayerList';
import { PrayerListStill } from './PrayerList/PrayerListStill';
import { Progress } from './Progress/Progress';

export type ResponseDataProps = {
  city: number;
  d: number;
  dd: number;
  hijri: string;
  m: number;
  prayers: string[];
  tarix: string;
  y: number;
  _id: string;
};

type AppViewProps = {
  data: ResponseDataProps;
};

const today = getDayOfYear(new Date())

export const Namaz = ({ data }: AppViewProps) => {
  const dispatch = useDispatch();

  const convertedData = new PrayerData(data)

  useEffect(() => {
    dispatch(setNamazData({ city: convertedData.city, dayOfYear: convertedData.dayOfYear }));
  }, [convertedData.city, convertedData.dayOfYear, dispatch])

  return (
    <div className="align-middle container mx-auto my-10 pb-2">
      <Suspense fallback={<Loader />}>
        <Location
          city={convertedData.city}
          location={selectCity(convertedData.city)}
          tarix={convertedData.tarix}
          hijri={convertedData.hijri}
          dayOfYear={convertedData.dayOfYear}
        />

        <Progress bar={convertedData.progress} />
      </Suspense>

      {convertedData.dayOfYear === today ? (
        <PrayerList
          prayers={convertedData.prayers}
          currentPrayer={convertedData.currentPrayer}
        />
      ) : (
        <PrayerListStill prayers={convertedData.prayers} />
      )}
    </div>
  );
};