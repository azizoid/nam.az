import { Loader } from "@/components";
import { Namaz } from "@/screens/Namaz/Namaz";
import { fetcher } from "@/utilities/fetcher";
import { useRouter } from "next/router"
import useSWR from 'swr'

const CityDayPage = () => {
  const router = useRouter()

  const { city, dayOfYear } = router.query

  const { data, error } = useSWR(city && dayOfYear ? `https://nam.az/api/${city}/${dayOfYear}` : null, fetcher)

  if (error) return <div>Error</div>
  if (!data) return <Loader />

  return <Namaz data={data} />
}

export default CityDayPage