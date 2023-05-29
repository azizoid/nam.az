'use client'

import Error from 'next/error'

import Joi from 'joi'
import { NextPageContext } from 'next'
import useSWR from 'swr'

import { cityRule, dayOfYearRule } from '@/assist/joiValidationRules'
// import { Loader } from '@/components'
import { Loader } from '@/components/Loader/Loader'
import { Namaz } from '@/screens/Namaz/Namaz'
import { fetcher } from '@/utilities/fetcher'

// const Namaz = dynamic(() => import('@/app/[soorah]/Namaz').then(page => page.Namaz))
// const Ayah = dynamic(() => import('@/components/Ayah/Ayah').then(page => page.Ayah))

const schema = Joi.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
})

type DayOfYearPageProps = { params: { city: string, dayOfYear: string } }

const DayOfYearPage = ({ params }: DayOfYearPageProps) => {
  const { city = null, dayOfYear = null } = params

  // Validate city query using Joi
  const { value, error } = schema.validate({ city: Number(city), dayOfYear: Number(dayOfYear) })

  const { data, error: fetchError } = useSWR(value.city && !error ? `/api/v2/${value.city}/${dayOfYear}` : null, fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (city && error) {
    return <Error statusCode={404} /> // Render the built-in 404 (Not Found) page
  }

  if (fetchError) {
    return <Error statusCode={400} /> // Render the built-in 400 (Bad Request) page
  }
  if (!data) {
    return <Loader />
  }

  return <Namaz data={data} />
}

export default DayOfYearPage