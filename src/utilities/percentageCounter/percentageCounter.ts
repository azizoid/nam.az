import { differenceInSeconds, parse } from 'date-fns'

type PercentageCounterProps = {
  currentPrayer: number;
  apiPrayers: string[];
  nowis: string;
  newDate: Date;
};

export const percentageCounter = ({
  currentPrayer,
  apiPrayers,
  nowis,
  newDate,
}: PercentageCounterProps): number => {
  const currentTime = parse(nowis, 'HH:mm', newDate)
  const currentPrayerTime = parse(apiPrayers[currentPrayer], 'HH:mm', newDate)

  const untillNow = differenceInSeconds(currentTime, currentPrayerTime)

  let untillNext: number

  if (currentPrayer === 5) {
    untillNext = differenceInSeconds(
      parse('23:59', 'HH:mm', newDate),
      currentPrayerTime
    )
  } else {
    untillNext = differenceInSeconds(
      parse(apiPrayers[currentPrayer + 1], 'HH:mm', newDate),
      currentPrayerTime
    )
  }

  const progress = Math.max(Math.floor(((untillNow * 100) / untillNext)), 0)
  return progress
}