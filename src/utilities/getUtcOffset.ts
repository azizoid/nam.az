import { getTimezoneOffset } from 'date-fns-tz'
import tzLookup from 'tz-lookup'

export function getUtcOffset(latitude: number, longitude: number): number {
  const timezone = tzLookup(latitude, longitude)
  const now = new Date()
  const offset = getTimezoneOffset(timezone, now) / 60000

  return offset
}