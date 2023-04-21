import { percentageCounter } from '@/utilities';
import { format, formatDistanceStrict, getDayOfYear, parse } from 'date-fns';
import { az } from 'date-fns/locale';

interface Prayer {
  id: number;
  time: string;
  rakat: number;
  ago: string;
  title: string;
}

const newDate = new Date()
const nowis = format(newDate, 'HH:mm');

const prayersTemplate = [
  { id: 1, time: '-:-', rakat: 2, ago: '', title: 'Sübh namazı' },
  { id: 2, time: '-:-', rakat: 0, ago: '', title: 'Gün çıxır' },
  { id: 3, time: '-:-', rakat: 4, ago: '', title: 'Zöhr namazı' },
  { id: 4, time: '-:-', rakat: 4, ago: '', title: 'Əsr namazı' },
  { id: 5, time: '-:-', rakat: 3, ago: '', title: 'Məğrib namazı' },
  { id: 6, time: '-:-', rakat: 4, ago: '', title: 'İşa namazı' },
]

export class PrayerData {
  city: number;
  tarix: string;
  hijri: string;
  dayOfYear: number;
  prayers: Prayer[];
  nowis: string;
  currentPrayer: number;
  progress: number = 0

  constructor(data: any) {
    this.city = data.city;
    this.tarix = data.tarix;
    this.hijri = data.hijri;
    this.dayOfYear = data.dd;
    this.nowis = nowis;

    let currentPrayer = 0;
    this.prayers = prayersTemplate.map((prayer, i) => {
      prayer.time = data.prayers[i]
      prayer.ago = formatDistanceStrict(
        parse(prayer.time, 'HH:mm', new Date()),
        new Date(),
        { locale: az, addSuffix: true }
      );

      if (prayer.time < nowis) {
        currentPrayer = prayer.id;
      }

      return prayer;
    });

    this.currentPrayer = currentPrayer;

    if (getDayOfYear(new Date()) === this.dayOfYear) {
      this.progress = percentageCounter({
        currentPrayer,
        apiPrayers: data.prayers,
        nowis: nowis,
        newDate,
      })
    }
  }
}