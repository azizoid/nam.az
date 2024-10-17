import { tzOffset } from '@date-fns/tz'
import tzLookup from 'tz-lookup'

export function getUtcOffset(latitude: number, longitude: number): number {
  const timezone = tzLookup(latitude, longitude)
  const now = new Date()
  const offset = tzOffset(timezone, now)

  return offset
}