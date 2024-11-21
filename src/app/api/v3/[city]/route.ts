import { NextResponse } from 'next/server'

import { getDayOfYear } from 'date-fns'
import { z } from 'zod'

import { cityRule } from '@/assets/zodValidationRules'

import { getNamazService } from './getNamazService'

const schema = z.object({
  city: cityRule,
})

type ParamsType = { params: Promise<{ city: string }> }

export const GET = async (_: Request, props: ParamsType) => {
  const params = await props.params
  try {
    const { city } = params

    const validationResult = schema.safeParse({ city })
    if (!validationResult.success) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })
    }

    const dayOfYear = getDayOfYear(new Date())
    const prayerTimes = await getNamazService({ city: validationResult.data.city, dayOfYear })

    return NextResponse.json(prayerTimes, { status: 200 })

  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}