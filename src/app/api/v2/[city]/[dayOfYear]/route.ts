import { NextResponse } from 'next/server'

import Joi from 'joi'

import { cityRule, dayOfYearRule } from '@/assets/joiValidationRules'
import { connectToDatabase } from '@/utilities/connectToDatabase/connectToDatabase'
import { generateDates, leapYearOffset } from '@/utilities/server'

import { PrayerReturnProps } from '.'

const schema = Joi.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
})

type ParamsType = { params: { city: string, dayOfYear: string } }

export const GET = async (_: Request, { params }: ParamsType) => {
  const client = await connectToDatabase()
  const db = client.db(process.env.MONGODB_DB).collection(process.env.MONGODB_COLLECTION || '')

  try {
    const { city, dayOfYear } = params

    const { value: validationValue, error: validationError } = schema.validate({ city, dayOfYear })
    if (validationError) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })

    }

    const tempLeapYearAdjustment = leapYearOffset(Number(validationValue.dayOfYear))
    const dd = tempLeapYearAdjustment + Number(validationValue.dayOfYear) // TODO: rename to `dayOfYearWithLeapYearAdjustment`
    const query = { city: validationValue.city, dd }

    const prayerTimes = await db.findOne<PrayerReturnProps>(query, { projection: { _id: 0 } })

    if (!prayerTimes) {
      return NextResponse.json({ error: 'Date not found' }, { status: 404 })
    }

    const twoDates = generateDates({ m: prayerTimes.m, d: prayerTimes.d })

    return NextResponse.json({ ...prayerTimes, dd: prayerTimes.dd - tempLeapYearAdjustment, ...twoDates })

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