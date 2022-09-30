import { differenceInSeconds, parse } from 'date-fns';

export type PercentageCouter = {
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
}: PercentageCouter): number => {
  console.table({
    currentPrayer,
    apiPrayers,
    nowis,
    newDate,
  });
  const untillNow = differenceInSeconds(
    parse(nowis, 'HH:mm', newDate),
    parse(apiPrayers[currentPrayer], 'HH:mm', newDate)
  );

  let untillNext;

  if (currentPrayer === 5) {
    untillNext = differenceInSeconds(
      parse('23:59', 'HH:mm', newDate),
      parse(apiPrayers[currentPrayer], 'HH:mm', newDate)
    );
  } else {
    untillNext = differenceInSeconds(
      parse(apiPrayers[currentPrayer++], 'HH:mm', newDate),
      parse(apiPrayers[currentPrayer], 'HH:mm', newDate)
    );
  }
  const progress = Math.abs(Math.floor((untillNow * 100) / untillNext));
  return progress > 100 ? 100 : progress;
};
