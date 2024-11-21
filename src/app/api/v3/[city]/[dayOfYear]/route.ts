import { NextResponse } from 'next/server'

import { z } from 'zod'

import { cityRule, dayOfYearRule } from '@/assets/zodValidationRules'

import { getNamazService } from '../getNamazService'

const schema = z.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
})

type ParamsType = { params: Promise<{ city: string, dayOfYear: string }> }

export const GET = async (_: Request, props: ParamsType) => {
  const params = await props.params
  try {
    const { city, dayOfYear } = params

    const validationResult = schema.safeParse({ city, dayOfYear: Number(dayOfYear) })
    if (!validationResult.success) {
      return NextResponse.json({ error: 'Invalid City or Day of the year' }, { status: 404 })
    }

    const { city: validatedCity, dayOfYear: validatedDayOfYear } = validationResult.data

    const prayerTimes = await getNamazService({ city: validatedCity, dayOfYear: validatedDayOfYear })

    return NextResponse.json(prayerTimes)

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}