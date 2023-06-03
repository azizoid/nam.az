import { coordinates } from '@/assets/coordinates'

export const selectCity = (city: number): string =>
  coordinates.find(item => item.id === city)?.city || coordinates[0].city
