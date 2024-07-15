import tzLookup from 'tz-lookup'
import { getTimezoneOffset } from 'date-fns-tz';

export function getUtcOffset(latitude: number, longitude: number): number {
  const timezone = tzLookup(latitude, longitude);
  console.log({ timezone })
  const now = new Date();
  const offset = getTimezoneOffset(timezone, now) / 60000;

  return offset;
}