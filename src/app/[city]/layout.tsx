import { PropsWithChildren, Suspense } from 'react'

import { coordinates } from '@/assets/coordinates'
import { Ayah } from '@/components/Ayah/Ayah'

export type CityLayoutProps = PropsWithChildren<{
  params: Promise<{ city: string }>
}>

export const generateMetadata = async (props: CityLayoutProps) => {
  const params = await props.params
  const { city = null } = params

  const title = coordinates.find(({ id }) => id === Number(city))?.city

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