import dynamic from 'next/dynamic'
import Error from 'next/error'
import { useRouter } from 'next/router'

import Joi from 'joi'
import useSWR from 'swr'

import { cityRule, dayOfYearRule } from '@/assets/joiValidationRules'
import { Loader } from '@/components'
import { fetcher } from '@/utilities/fetcher'

const Namaz = dynamic(() => import('@/screens/Namaz/Namaz').then(page => page.Namaz))

const schema = Joi.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
})

const CityDayPage = () => {
  const router = useRouter()

  const { city = null, dayOfYear = null } = router.query

  // Validate city query using Joi
  const { value, error } = schema.validate({ city: Number(city), dayOfYear: Number(dayOfYear) })

  const { data, error: fetchError } = useSWR(value.city && !error ? `/api/v1/${value.city}/${dayOfYear}` : null, fetcher, {
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

export default CityDayPage