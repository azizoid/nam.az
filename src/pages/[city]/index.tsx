import dynamic from 'next/dynamic'
import Error from 'next/error';
import { Loader } from "@/components";
import { fetcher } from "@/utilities/fetcher";
import { useRouter } from "next/router"
import useSWR from 'swr'
import Joi from 'joi'
import { cityRule } from '@/assist/joiValidationRules';

const Namaz = dynamic(() => import('@/screens/Namaz/Namaz').then(page => page.Namaz))
const Ayah = dynamic(() => import('@/components/Ayah/Ayah').then(page => page.Ayah))

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

  return <>
    <Namaz data={data} />
    <Ayah />
  </>
}

export default CityPage