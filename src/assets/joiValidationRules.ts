import { getDaysInYear } from 'date-fns'
import Joi from 'joi'

import { coordinates } from './coordinates'

const slugs = coordinates.map(city => city.slug)

export const cityRule = Joi.valid(...slugs)
export const dayOfYearRule = Joi.number().integer().min(1).max(getDaysInYear(new Date())).required()