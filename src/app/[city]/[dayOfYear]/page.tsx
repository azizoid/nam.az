'use client'
import Error from 'next/error'
import { notFound } from 'next/navigation'

import useSWR from 'swr'
import { z } from 'zod'

import { cityRule, dayOfYearRule } from '@/assets/zodValidationRules'
import { Loader } from '@/components/Loader/Loader'
import { Namaz } from '@/screens/Namaz/Namaz'
import { fetcher } from '@/utilities/fetcher'

const schema = z.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
})

type DayOfYearPageProps = { params: { city: string | null, dayOfYear: string | null } }

const DayOfYearPage = ({ params: { city: cityParam = null, dayOfYear: dayOfyearParam = null } }: DayOfYearPageProps) => {
  const validationResult = schema.safeParse({ city: cityParam, dayOfYear: Number(dayOfyearParam) })

  if (!validationResult.success) {
    notFound()
  }

  const { city, dayOfYear } = validationResult.data

  const { data, error: fetchError } = useSWR(city ? `/api/v3/${city}/${dayOfYear}` : null, fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (fetchError) {
    return <Error statusCode={400} /> // Render the built-in 400 (Bad Request) page
  }

  if (!data) {
    return <Loader />
  }

  return <Namaz data={data} />
}

export default DayOfYearPage