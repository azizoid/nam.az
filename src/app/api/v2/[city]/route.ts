import { NextResponse } from 'next/server'

import { getDayOfYear } from 'date-fns'
import Joi from 'joi'

import { cityRule } from '@/assist/joiValidationRules'
import { connectToDatabase } from '@/utilities/connectToDatabase/connectToDatabase'
import { generateDates, leapYearOffset } from '@/utilities/server'

const schema = Joi.object({
  city: cityRule,
})

type ParamsType = { params: { city: string } }

export const GET = async (_: Request, { params }: ParamsType) => {
  const client = await connectToDatabase()
  const db = client.db(process.env.MONGODB_DB).collection(process.env.MONGODB_COLLECTION || '')

  try {
    const { city } = params

    const { value: validationValue, error: validationError } = schema.validate({ city })
    if (validationError) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })

    }

    const dayOfYear = getDayOfYear(new Date())
    const tempLeapYearAdjustment = leapYearOffset(dayOfYear)
    const dd = tempLeapYearAdjustment + dayOfYear // TODO: rename to `dayOfYearWithLeapYearAdjustment`
    const query = { city: validationValue.city, dd }

    const prayerTimes = await db.findOne(query)

    if (!prayerTimes) {
      return NextResponse.json({ error: 'Date not found' }, { status: 404 })
    }

    const twoDates = generateDates({ m: prayerTimes.m, d: prayerTimes.d })

    return NextResponse.json({ ...prayerTimes, dd: prayerTimes.dd - tempLeapYearAdjustment, ...twoDates }, {
      status: 200, headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  } finally {
    if (client) {
      await client.close()
    }
  }
}