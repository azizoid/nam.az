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
    weekday: 'long',
  } as const

  const formatter = new Intl.DateTimeFormat('az', options)

  const formatToLowerCase = (part: Intl.DateTimeFormatPart) => {
    if (part.type === 'dayPeriod') {
      return { ...part, value: part.value.toLowerCase() }
    }
    return part
  }

  const tarix = formatter
    .formatToParts(generatedDate)
    .map(formatToLowerCase)
    .map(({ value }) => value)
    .join('')

  const hijri = new Intl.DateTimeFormat('az', {
    ...options,
    calendar: 'islamic',
    weekday: undefined,
  }).format(hijriDate).slice(3)

  return { tarix, hijri }
}