import { NextResponse } from 'next/server'

import Joi from 'joi'

import { cityRule, dayOfYearRule } from '@/assets/joiValidationRules'
import { leapYearOffset } from '@/utilities/server'

import { getNamazService } from '../getNamazService'

const schema = Joi.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
})

type ParamsType = { params: { city: string, dayOfYear: string } }

export const GET = async (_: Request, { params }: ParamsType) => {
  try {
    const { city, dayOfYear } = params

    const { value: validationValue, error: validationError } = schema.validate({ city, dayOfYear })
    if (validationError) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })

    }

    const tempLeapYearAdjustment = leapYearOffset(Number(validationValue.dayOfYear))
    const dayOfYearWithLeapYearAdjustment = tempLeapYearAdjustment + Number(validationValue.dayOfYear)

    const prayerTimes = await getNamazService({ city: validationValue.city, dayOfYear: dayOfYearWithLeapYearAdjustment })

    return NextResponse.json(prayerTimes)

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}