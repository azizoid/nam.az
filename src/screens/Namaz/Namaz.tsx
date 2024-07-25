'use client'
import { Suspense, useEffect } from 'react'

import Head from 'next/head'

import { getDayOfYear } from 'date-fns'
import { useDispatch } from 'react-redux'

import { Loader } from '@/components/Loader/Loader'
import { setNamazData } from '@/store/namazSlice'
import { selectCity } from '@/utilities'

import { Location } from './Location/Location'
import { PrayerData } from './Namaz.entity'
import { PrayerList } from './PrayerList/PrayerList'
import { PrayerListStill } from './PrayerList/PrayerListStill'
import { Progress } from './Progress/Progress'

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
  const dispatch = useDispatch()

  const convertedData = new PrayerData(data)

  useEffect(() => {
    dispatch(setNamazData({ city: convertedData.city, dayOfYear: convertedData.dayOfYear }))
  }, [convertedData.city, convertedData.dayOfYear, dispatch])

  return (
    <>
      <Head>
        <title>{convertedData.city} | Nam.az - Namazını qıl</title>
      </Head>
      <div className="container mx-auto my-10 pb-2 align-middle">
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
    </>
  )
}