'use client'
import dynamic from 'next/dynamic'
import Error from 'next/error'

import useSWR from 'swr'

import { Loader } from '@/components/Loader/Loader'
import { fetcher } from '@/utilities/fetcher'

const Namaz = dynamic(() => import('@/screens/Namaz/Namaz').then(page => page.Namaz), { ssr: false })

export const DayOfYearPageView = ({ city, dayOfYear }: { city: string, dayOfYear: number }) => {
  const { data, error: fetchError } = useSWR(city ? `/api/v2/${city}/${dayOfYear}` : null, fetcher, {
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

export default DayOfYearPageView