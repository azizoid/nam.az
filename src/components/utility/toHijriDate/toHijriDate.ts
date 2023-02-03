export const toHijriDate = (date: Date): string => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    numberingSystem: 'latn',
    timeZone: 'Asia/Baku',
  } as const;

  const hijriDate = new Intl.DateTimeFormat('az', {
    ...options,
    calendar: 'islamic',
  }).format(date);

  console.log({ hijriDate });

  return hijriDate;
};
