'use client'
import Error from 'next/error'
import { notFound } from 'next/navigation'

import useSWR from 'swr'
import { z } from 'zod'

import { cityRule } from '@/assets/zodValidationRules' // Assuming you have converted to Zod
import { Loader } from '@/components/Loader/Loader'
import { Namaz, ResponseDataProps } from '@/screens/Namaz/Namaz'
import { fetcher } from '@/utilities/fetcher'

export type CityPageProps = { params: { city: string | null } }

const schema = z.object({
  city: cityRule,
})

const CityPage = ({ params: { city: cityParam = null } }: CityPageProps) => {
  const validationResult = schema.safeParse({ city: cityParam })

  if (!validationResult.success) {
    notFound()
  }

  const { data, error: fetchError } = useSWR<ResponseDataProps>(`/api/v3/${validationResult.data.city}`, fetcher, {
    // revalidateOnMount: true,
    // dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (fetchError) {
    return <Error statusCode={400} /> // Render the built-in 400 (Bad Request) page
  }

  if (!data) {
    return <Loader />
  }

  return <Namaz data={data} />

}

export default CityPage