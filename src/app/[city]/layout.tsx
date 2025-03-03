import { PropsWithChildren } from 'react'

import { Ayah } from '@/components/Ayah/Ayah'
import { selectCity } from '@/utilities/selectCity/selectCity'

export type CityLayoutProps = PropsWithChildren<{
  params: Promise<{ city: string }>
}>

export const generateMetadata = async (props: CityLayoutProps) => {
  const params = await props.params
  const { city = null } = params
  const title = selectCity(city)?.city

  if (!title) return

  return {
    title,
    openGraph: { title },
    twitter: { title }
  }
}

const CityLayout = ({ children }: CityLayoutProps) => {
  return <>
    {children}

    <Ayah />

  </>
}

export default CityLayout