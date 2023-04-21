import { ResponseDataProps } from "@/screens/Namaz/Namaz"

export const generateDates = (
  { m: month = 1, d: day = 1 }: Partial<ResponseDataProps>,
  currentJsDate = new Date(),
) => {
  const generatedDate = new Date(
    currentJsDate.getFullYear(),
    month - 1,
    day,
    12
  )

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    numberingSystem: "latn",
    timeZone: "Asia/Baku",
  } as const

  const tarix = new Intl.DateTimeFormat("az", {
    ...options,
    calendar: "gregory",
    weekday: "long",
  }).format(generatedDate)

  const hijri = new Intl.DateTimeFormat("az", {
    ...options,
    calendar: "islamic",
  })
    .format(generatedDate)
    .slice(3)

  const result = {
    // tarix: capitalizeFirstLetter(tarix, "az"),
    tarix,
    hijri,
  }

  return result
}