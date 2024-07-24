import { coordinates } from '@/assets/coordinates'

export const selectCity = (city: string): string =>
  coordinates.find(item => item.slug === city)?.city || coordinates[0].city
