import { getDaysInYear } from 'date-fns'
import { z } from 'zod'

import { coordinates } from './coordinates'

const slugs = coordinates.map(city => city.slug)

export const cityRule = z.string().refine(value => slugs.includes(value), {
  message: 'Invalid city slug',
})
export const dayOfYearRule = z.number().int().min(1).max(getDaysInYear(new Date()))