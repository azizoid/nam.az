import { NextResponse } from 'next/server'

import Joi from 'joi'

import { cityRule, dayOfYearRule } from '@/assets/joiValidationRules'
import { getNamazService } from '@/lib/getNamazService'
import { leapYearOffset } from '@/utilities/server'

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
    const dd = tempLeapYearAdjustment + Number(validationValue.dayOfYear) // TODO: rename to `dayOfYearWithLeapYearAdjustment`

    const prayerTimes = await getNamazService({ city: validationValue.city, dd })

    return NextResponse.json(prayerTimes)

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}