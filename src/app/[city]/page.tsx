'use client'
import { use } from 'react'

import Error from 'next/error'
import { notFound } from 'next/navigation'

import useSWR from 'swr'
import { z } from 'zod'

import { cityRule } from '@/assets/zodValidationRules'
import { Loader } from '@/components/Loader/Loader'
import { Namaz, ResponseDataProps } from '@/screens/Namaz/Namaz'
import { fetcher } from '@/utilities/fetcher'

export type CityPageProps = { params: Promise<{ city: string | null }> }

const schema = z.object({
  city: cityRule,
})

const CityPage = (props: CityPageProps) => {
  const params = use(props.params)

  const {
    city: cityParam = null
  } = params

  const validationResult = schema.safeParse({ city: cityParam })

  if (!validationResult.success) {
    notFound()
  }

  const { data, error: fetchError, isLoading } = useSWR<ResponseDataProps>(`/api/v3/${validationResult.data.city}`, fetcher, {
    // revalidateOnMount: true,
    // dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (isLoading) {
    return <Loader />
  }

  if (fetchError) {
    return <Error statusCode={400} />
  }

  if (!data) {
    return <Error statusCode={404} />
  }

  return <Namaz data={data} />
}

export default CityPage