'use client'
import dynamic from 'next/dynamic'
import Error from 'next/error'

import Joi from 'joi'
import useSWR from 'swr'

import { cityRule } from '@/assist/joiValidationRules'
import { CutLoader } from '@/components/CutLoader/CutLoader'
import { Loader } from '@/components/Loader/Loader'
import { fetcher } from '@/utilities/fetcher'

const Namaz = dynamic(() => import('@/screens/Namaz/Namaz').then(page => page.Namaz), { ssr: false })
const Ayah = dynamic(() => import('@/components/Ayah/Ayah').then(page => page.Ayah), { ssr: false, loading: () => <CutLoader /> })

const schema = Joi.object({
  city: cityRule,
})

type CityPageProps = { params: { city: string } }

const CityPage = ({ params }: CityPageProps) => {
  const { city = null } = params

  // Validate city query using Joi
  const { value, error } = schema.validate({ city: Number(city) })

  const { data, error: fetchError } = useSWR(value.city && !error ? `/api/v2/${value.city}` : null, fetcher, {
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

  return <>
    <Namaz data={data} />

    <Ayah />
  </>
}

export default CityPage