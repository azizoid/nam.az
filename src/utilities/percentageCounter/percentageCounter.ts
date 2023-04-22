import { differenceInSeconds, parse } from 'date-fns'

type PercentageCouterProps = {
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
}: PercentageCouterProps): number => {
  const untillNow = differenceInSeconds(
    parse(nowis, 'HH:mm', newDate),
    parse(apiPrayers[currentPrayer], 'HH:mm', newDate)
  )

  let untillNext

  if (currentPrayer === 5) {
    untillNext = differenceInSeconds(
      parse('23:59', 'HH:mm', newDate),
      parse(apiPrayers[currentPrayer], 'HH:mm', newDate)
    )
  } else {
    untillNext = differenceInSeconds(
      parse(apiPrayers[currentPrayer++], 'HH:mm', newDate),
      parse(apiPrayers[currentPrayer], 'HH:mm', newDate)
    )
  }
  const progress = Math.abs(Math.floor((untillNow * 100) / untillNext))
  return progress > 100 ? 100 : progress
}
