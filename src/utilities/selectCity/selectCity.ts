import { coordinates } from '@/assist/coordinates';

export const selectCity = (city: number): string =>
  coordinates.find(item => item.id === city)?.city || coordinates[0].city;
