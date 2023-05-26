import { ResponseDataProps } from '@/screens/Namaz/Namaz'

export const generateDates = (
  { m: month = 1, d: day = 1 }: Partial<ResponseDataProps>,
  currentJsDate = new Date(),
) => {
  const generatedDate = new Date(currentJsDate.getFullYear(), month - 1, day, 12)

  const hijriOffset = Number(process.env.NEXT_PUBLIC_HIJRI_OFFSET ?? 0) // Offset of -1 day

  const hijriDate = new Date(generatedDate)
  hijriDate.setDate(hijriDate.getDate() + hijriOffset) // Apply offset to Hijri date

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    numberingSystem: 'latn',
    timeZone: 'Asia/Baku',
  } as const

  const formatter = new Intl.DateTimeFormat('az', {
    ...options,
    weekday: 'long',
  })

  const tarix = formatter.formatToParts(generatedDate)
    .map(({ type, value }) => (type === 'dayPeriod') ? value.toLowerCase() : value)
    .join('')

  const hijri = new Intl.DateTimeFormat('az', {
    ...options,
    calendar: 'islamic',
  }).format(hijriDate).slice(3)

  return { tarix, hijri }
}