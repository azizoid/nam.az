import { coordinates as cities } from 'assist/coordinates';

export const selectCity = (city: number): string =>
  cities.find(item => item.id === city)?.city || cities[0].city;
