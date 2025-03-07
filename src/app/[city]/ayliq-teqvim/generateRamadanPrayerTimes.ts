import { addDays, eachDayOfInterval, getDayOfYear } from 'date-fns'

import { getNamazService } from '@/app/api/v3/[city]/getNamazService'

export const generateRamadanPrayerTimes = async (city: string) => {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), 1)
  const end = addDays(start, 28)

  const datesArray = eachDayOfInterval({ start, end })

  const prayerTimes = await Promise.all(
    datesArray.map(async (date) => {
      const dayOfYear = getDayOfYear(date)
      return { ...await getNamazService({ city, dayOfYear }), date }
    })
  )

  return prayerTimes
}