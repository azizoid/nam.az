import { coordinates, CoordinatesProps } from '@/assets/coordinates'

export const selectCity = (citySlug: string | null): CoordinatesProps =>
  coordinates.find(item => item.slug === citySlug) || coordinates[0]
