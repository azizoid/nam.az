import { Loader } from "@/components";
import { Namaz } from "@/screens/Namaz/Namaz";
import { fetcher } from "@/utilities/fetcher";
import { useRouter } from "next/router"
import useSWR from 'swr'

const CityPage = () => {
  const router = useRouter()

  const { city } = router.query

  const { data, error } = useSWR(city ? `/api/v1/${city}` : null, fetcher)

  if (error) return <div>Error</div>
  if (!data) return <Loader />

  return <Namaz data={data} />
}

export default CityPage