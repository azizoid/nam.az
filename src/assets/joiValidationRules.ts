import Joi from 'joi'

import { coordinates } from './coordinates'

export const cityRule = Joi.number().integer().min(1).max(coordinates.length).required()
export const dayOfYearRule = Joi.number().integer().min(1).max(366).required()