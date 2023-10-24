import { NextResponse } from 'next/server'

import { getDayOfYear } from 'date-fns'
import Joi from 'joi'

import { cityRule } from '@/assets/joiValidationRules'
import { leapYearOffset } from '@/utilities/server'

import { getNamazService } from './getNamazService'

const schema = Joi.object({
  city: cityRule,
})

type ParamsType = { params: { city: string } }

export const GET = async (_: Request, { params }: ParamsType) => {
  try {
    const { city } = params

    const { value: validationValue, error: validationError } = schema.validate({ city })
    if (validationError) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })

    }

    const dayOfYear = getDayOfYear(new Date())
    const tempLeapYearAdjustment = leapYearOffset(dayOfYear)
    const dayOfYearWithLeapYearAdjustment = tempLeapYearAdjustment + dayOfYear

    const prayerTimes = await getNamazService({ city: validationValue.city, dayOfYear: dayOfYearWithLeapYearAdjustment })

    return NextResponse.json(prayerTimes, { status: 200 })

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}