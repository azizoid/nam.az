'use client'
import { useEffect } from 'react'

import Head from 'next/head'

import { getDayOfYear } from 'date-fns'
import { useAtom } from 'jotai'

import { setNamazDataAtom } from '@/store/jotaiStore'
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
  const [, setNamazData] = useAtom(setNamazDataAtom)

  const { city, dayOfYear, tarix, hijri, progress, currentPrayer, prayers } = new PrayerData(data)

  useEffect(() => {
    setNamazData({ city: city, dayOfYear: dayOfYear })
  }, [city, dayOfYear, setNamazData])

  return (
    <div className="container mx-auto my-10 pb-2 align-middle">
      <Head>
        <title>{city} | Nam.az - Namazını qıl</title>
      </Head>
      <Location
        city={city}
        location={selectCity(city)}
        tarix={tarix}
        hijri={hijri}
        dayOfYear={dayOfYear}
      />

      <Progress bar={progress} />

      {dayOfYear === today ? (
        <PrayerList
          prayers={prayers}
          currentPrayer={currentPrayer}
        />
      ) : (
        <PrayerListStill prayers={prayers} />
      )}
    </div>
  )
}