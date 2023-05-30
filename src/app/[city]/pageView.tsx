'use client'
import dynamic from 'next/dynamic'
import Error from 'next/error'

import useSWR from 'swr'

import { CutLoader } from '@/components/CutLoader/CutLoader'
import { Loader } from '@/components/Loader/Loader'
import { fetcher } from '@/utilities/fetcher'

const Namaz = dynamic(() => import('@/screens/Namaz/Namaz').then(page => page.Namaz), { ssr: false })
const Ayah = dynamic(() => import('@/components/Ayah/Ayah').then(page => page.Ayah), { ssr: false, loading: () => <CutLoader /> })

export const CityPageView = ({ city }: { city: string }) => {
  const { data, error: fetchError } = useSWR(`/api/v2/${city}`, fetcher, {
    revalidateOnMount: true,
    dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (fetchError) {
    return <Error statusCode={400} /> // Render the built-in 400 (Bad Request) page
  }

  if (!data) {
    return <Loader />
  }

  return <>
    <Namaz data={data} />
    <Ayah />
  </>
}

export default CityPageView