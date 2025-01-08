import { az } from 'date-fns/locale'

import { format, formatDistanceStrict, getDayOfYear, parse } from 'date-fns'

import { percentageCounter } from '@/utilities/percentageCounter/percentageCounter'

interface Prayer {
  id: number;
  time: string;
  rakat: number;
  ago: string;
  title: string;
}

const prayersTemplate = [
  { id: 1, time: '-:-', rakat: 2, ago: '', title: 'Sübh namazı' },
  { id: 2, time: '-:-', rakat: 0, ago: '', title: 'Gün çıxır' },
  { id: 3, time: '-:-', rakat: 4, ago: '', title: 'Zöhr namazı' },
  { id: 4, time: '-:-', rakat: 4, ago: '', title: 'Əsr namazı' },
  { id: 5, time: '-:-', rakat: 3, ago: '', title: 'Məğrib namazı' },
  { id: 6, time: '-:-', rakat: 4, ago: '', title: 'İşa namazı' },
]

export class PrayerData {
  city: string
  tarix: string
  hijri: string
  dayOfYear: number
  prayers: Prayer[]
  nowis: string
  currentPrayer: number
  progress: number = 0

  constructor(data: any) {
    const newDate = new Date()
    this.city = data.city
    this.tarix = data.tarix
    this.hijri = data.hijri
    this.dayOfYear = data.dd
    this.nowis = format(newDate, 'HH:mm')

    let currentPrayer = 5
    this.prayers = prayersTemplate.map((prayer, i) => {
      prayer.time = data.prayers[i]
      prayer.ago = formatDistanceStrict(
        parse(prayer.time, 'HH:mm', newDate),
        newDate,
        { locale: az, addSuffix: true }
      )

      if (prayer.time < this.nowis) {
        currentPrayer = i
      }

      return prayer
    })

    this.currentPrayer = currentPrayer

    if (getDayOfYear(newDate) === this.dayOfYear) {
      this.progress = percentageCounter({
        currentPrayer,
        apiPrayers: data.prayers,
        nowis: this.nowis,
        newDate,
      })
    }
  }
}