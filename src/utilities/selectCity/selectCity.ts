import { coordinates } from '@/assist/coordinates'

export const selectCity = (city: number): string => {
  const selectedCity = coordinates.find(item => item.id === city)
  return selectedCity?.city || coordinates[0].city
}