import { getDayOfYear } from 'date-fns'
import Joi from 'joi'
import { NextApiRequest, NextApiResponse } from 'next'

import { cityRule } from '@/assets/joiValidationRules'
import { connectToDatabase } from '@/utilities/connectToDatabase/connectToDatabase'
import { generateDates, leapYearOffset } from '@/utilities/server'
import { runMiddleware } from '@/utilities/server'

export type PrayerReturnProps = {
  prayers: string[],
  city: number,
  cityName: string,
  dd: number,
  m: number,
  d: number
}

const schema = Joi.object({
  city: cityRule,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await connectToDatabase()
  const db = client.db(process.env.MONGODB_DB).collection(process.env.MONGODB_COLLECTION || '')

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
    const query = { city: validationValue.city, dd }

    switch (method) {
      case 'GET': {
        const prayerTimes = await db.findOne<PrayerReturnProps>(query, { projection: { _id: 0 } })

        if (!prayerTimes) {
          return res.status(404).json({ message: 'Date not found' })
        }

        const twoDates = generateDates({ m: prayerTimes.m, d: prayerTimes.d })

        return res.status(200).json({ ...prayerTimes, dd: prayerTimes.dd - tempLeapYearAdjustment, ...twoDates })
      }

      default:
        return res.status(405).json({ message: 'Method not allowed' })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  } finally {
    if (client) {
      await client.close()
    }
  }
}