import { PrayerProps } from 'App/PrayerList/Prayer';
import { formatDistanceStrict, parse } from 'date-fns';
import az from 'date-fns/locale/az';

import { percentageCounter } from 'utility';

const prayersTemplate = [
  { id: 1, time: '-:-', rakat: 2, ago: '', title: 'Sübh namazı' },
  { id: 2, time: '-:-', rakat: 0, ago: '', title: 'Gün çıxır' },
  { id: 3, time: '-:-', rakat: 4, ago: '', title: 'Zöhr namazı' },
  { id: 4, time: '-:-', rakat: 4, ago: '', title: 'Əsr namazı' },
  { id: 5, time: '-:-', rakat: 3, ago: '', title: 'Məğrib namazı' },
  { id: 6, time: '-:-', rakat: 4, ago: '', title: 'İşa namazı' },
];

type PrayersDataProps = {
  apiPrayers: string[];
  nowis: string;
  newDate: Date;
  today: number;
  dataDd: number;
};

type PrayersDataReturn = {
  prayers: PrayerProps[];
  currentPrayer: number;
  progress: number;
};

export const usePrayersData = ({
  apiPrayers,
  nowis,
  newDate,
  today,
  dataDd,
}: PrayersDataProps): PrayersDataReturn => {
  let currentPrayer = 5;

  const prayers = prayersTemplate.map((prayer, i) => {
    prayer.time = apiPrayers[i];

    prayer.ago = formatDistanceStrict(
      newDate,
      parse(apiPrayers[i], 'HH:mm', newDate),
      { locale: az, addSuffix: true }
    );

    if (apiPrayers[i] < nowis) {
      currentPrayer = i;
    }

    if (today !== dataDd) {
      currentPrayer = -1;
    }

    return prayer;
  });

  const progress = percentageCounter({
    currentPrayer,
    apiPrayers: apiPrayers,
    nowis: nowis,
    newDate,
  });

  return { prayers, currentPrayer, progress };
};
