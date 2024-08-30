import { isLeapYear } from 'date-fns'

export function dayOfYearToDate(dayOfYear: number, year: number): Date {
  if (dayOfYear < 1 || dayOfYear > 366 || (dayOfYear > 365 && !isLeapYear(year))) {
    throw new Error(`Invalid day of the year: ${dayOfYear}`)
  }

  return new Date(year, 0, dayOfYear, 12)
}
