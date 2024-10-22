import { NextResponse } from 'next/server'

import { z } from 'zod'

import { cityRule, dayOfYearRule } from '@/assets/zodValidationRules' // Assuming you've converted these to Zod schemas

import { getNamazService } from '../getNamazService'

// Define the schema using Zod
const schema = z.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
})

type ParamsType = { params: { city: string, dayOfYear: string } }

export const GET = async (_: Request, { params }: ParamsType) => {
  try {
    const { city, dayOfYear } = params

    // Zod validation using safeParse
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