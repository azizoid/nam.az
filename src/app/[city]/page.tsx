import Error from 'next/error'
import { notFound } from 'next/navigation'

import Joi from 'joi'
import useSWR from 'swr'

import { cityRule } from '@/assets/joiValidationRules'
import { Namaz } from '@/screens/Namaz/Namaz'
import { fetcher } from '@/utilities/fetcher'

export type CityPageProps = { params: { city: string } }

const schema = Joi.object({
  city: cityRule,
})

const CityPage = ({ params }: CityPageProps) => {
  const { city = null } = params

  const { value, error } = schema.validate({ city: Number(city) })

  if (error) {
    notFound()
  }

  const { data, error: fetchError } = useSWR(`/api/v2/${city}`, fetcher, {
    // revalidateOnMount: true,
    // dedupingInterval: 60 * 60 * 1000, // TTL of 1 hour
  })

  if (fetchError) {
    return <Error statusCode={400} /> // Render the built-in 400 (Bad Request) page
  }

  if (!data) return

  return <Namaz data={data} />
}

export default CityPage