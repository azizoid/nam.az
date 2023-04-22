import { isLeapYear } from "date-fns"

let cachedIsLeapYear: boolean

export const leapYearOffset = (
  dayOfYear: number,
  year: number = new Date().getFullYear()
): number => {
  if (dayOfYear <= 59) {
    return 0
  }

  if (cachedIsLeapYear === undefined) {
    cachedIsLeapYear = isLeapYear(new Date(`${year}-04-12`))
  }

  return cachedIsLeapYear ? 0 : 1
}