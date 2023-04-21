import { isLeapYear } from "date-fns"

export const leapYearOffset = (
  dayOfTheYear: number,
  year: number = new Date().getFullYear()
): number => {
  if (dayOfTheYear > 59) {
    if (!isLeapYear(new Date(`${year}-04-12`))) {
      return dayOfTheYear + 1
    }
  }

  return dayOfTheYear
}