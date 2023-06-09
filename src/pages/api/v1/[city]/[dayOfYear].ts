import Joi from 'joi'
import { NextApiRequest, NextApiResponse } from 'next'

import { cityRule, dayOfYearRule } from '@/assets/joiValidationRules'
import { getNamazService } from '@/lib/getNamazService'
import { leapYearOffset } from '@/utilities/server'

const schema = Joi.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    const {
      query: { city, dayOfYear },
      method,
    } = req

    const { value: validationValue, error: validationError } = schema.validate({ city, dayOfYear })

    if (validationError) {
      return res.status(404).json({ message: 'City or Date not found' })
    }

    const tempLeapYearAdjustment = leapYearOffset(Number(validationValue.dayOfYear))
    const dd = tempLeapYearAdjustment + Number(validationValue.dayOfYear) // TODO: rename to `dayOfYearWithLeapYearAdjustment`

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