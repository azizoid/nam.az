import { getDayOfYear } from 'date-fns'
import { Db } from 'mongodb'

import { withMongo } from '@/utilities/mongodb'
import { generateDates, leapYearOffset } from '@/utilities/server'

export type PrayerReturnProps = {
  prayers: string[],
  city: number,
  cityName: string,
  dd: number,
  m: number,
  d: number
}

type GetNamazServiceProps = {
  city: number;
  dd: number;
}

export const getNamazService = async ({ city, dd }: GetNamazServiceProps) => await withMongo(async (db: Db) => {
  const contentCollection = db.collection(process.env.MONGODB_COLLECTION as string)

  const dayOfYear = dd ?? getDayOfYear(new Date())
  const tempLeapYearAdjustment = leapYearOffset(dayOfYear)

  const prayerTimes = await contentCollection.findOne<PrayerReturnProps>({ city, dd }, { projection: { _id: 0 } })

  if (!prayerTimes) {
    throw new Error('Date not found')
  }

  const twoDates = generateDates({ m: prayerTimes.m, d: prayerTimes.d })

  return { ...prayerTimes, dd: prayerTimes.dd - tempLeapYearAdjustment, ...twoDates }
})
