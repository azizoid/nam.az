import { coordinates } from '@/assets/coordinates'
import { PrayTimes } from '@/utilities'
import { dayOfYearToDate } from '@/utilities/dayOfYearToDate'
import { getUtcOffset } from '@/utilities/getUtcOffset'
import { generateDates } from '@/utilities/server'

export type PrayerReturnProps = {
  prayers: string[],
  city: number,
  cityName: string,
  dd: number,
  m: number,
  d: number
}

export type GetNamazServiceProps = {
  city: string;
  dayOfYear: number;
}

export const getNamazService = async ({ city, dayOfYear }: GetNamazServiceProps) => {

  const year = new Date().getFullYear()

  const calculatedDate = dayOfYearToDate(dayOfYear, year)
  const month = calculatedDate.getMonth() + 1
  const day = calculatedDate.getDate()

  const cityData = coordinates.find(c => c.slug === city)
  if (!cityData) {
    throw new Error('city not found')
  }

  const tzDate = getUtcOffset(cityData.lat, cityData.lng) / 60

  const calculatedPrayerTimes = PrayTimes()
  const prayerTimes = calculatedPrayerTimes.getTimes(calculatedDate, [cityData.lat, cityData.lng], tzDate, 0)

  if (!prayerTimes) {
    throw new Error('Prayer times not found')
  }

  const result = {
    prayers: [
      prayerTimes.fajr,
      prayerTimes.sunrise,
      prayerTimes.dhuhr,
      prayerTimes.asr,
      prayerTimes.maghrib,
      prayerTimes.isha,
    ],
    city: cityData.slug,
    cityName: cityData.city,
    dd: dayOfYear,
    m: month,
    d: day,
  }

  const twoDates = generateDates({ m: month, d: day })

  return { ...result, ...twoDates }
}
