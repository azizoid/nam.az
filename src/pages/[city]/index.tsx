import Error from 'next/error';
import { Loader } from "@/components";
import { Namaz } from "@/screens/Namaz/Namaz";
import { fetcher } from "@/utilities/fetcher";
import { useRouter } from "next/router"
import useSWR from 'swr'
import Joi from 'joi'
import { cityRule } from '@/assist/joiValidationRules';

const schema = Joi.object({
  city: cityRule,
});

const CityPage = () => {
  const router = useRouter()

  const { city = null } = router.query

  // Validate city query using Joi
  const { value, error } = schema.validate({ city: Number(city) })

  const { data, error: fetchError } = useSWR(value.city && !error ? `/api/v1/${value.city}` : null, fetcher, {
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

export default CityPage