import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { PrayerData } from './Namaz.entity';

import { setNamazData } from '@/store/namazSlice';

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

export const Namaz = ({ data }: AppViewProps) => {
  const dispatch = useDispatch();

  const convertedData = new PrayerData(data)

  useEffect(() => {
    dispatch(setNamazData({ city: convertedData.city, dayOfYear: convertedData.dayOfYear }));
  }, [convertedData.city, convertedData.dayOfYear, dispatch])

  return (
    <div className="align-middle container mx-auto my-10 pb-2">

    </div>
  );
};