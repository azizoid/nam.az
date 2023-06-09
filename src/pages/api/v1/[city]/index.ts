import { getDayOfYear } from 'date-fns'
import Joi from 'joi'
import { NextApiRequest, NextApiResponse } from 'next'

import { cityRule } from '@/assets/joiValidationRules'
import { getNamazService } from '@/lib/getNamazService'
import { leapYearOffset } from '@/utilities/server'
import { runMiddleware } from '@/utilities/server'

const schema = Joi.object({
  city: cityRule,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {

    await runMiddleware(req, res)

    const {
      query: { city },
      method,
    } = req

    const { value: validationValue, error: validationError } = schema.validate({ city })
    if (validationError) {
      return res.status(404).json({ message: 'City not found' })
    }

    const dayOfYear = getDayOfYear(new Date())
    const tempLeapYearAdjustment = leapYearOffset(dayOfYear)
    const dd = tempLeapYearAdjustment + dayOfYear // TODO: rename to `dayOfYearWithLeapYearAdjustment`

    switch (method) {
      case 'GET': {
        const prayerTimes = await getNamazService({ city: validationValue.city, dd })

        return res.status(200).json(prayerTimes)
      }

      default:
        return res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}