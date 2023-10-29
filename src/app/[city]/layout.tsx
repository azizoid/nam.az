import { PropsWithChildren } from 'react'

import { coordinates } from '@/assets/coordinates'

export type CityLayoutProps = PropsWithChildren<{ params: { city: string } }>

export const generateMetadata = async ({ params }: CityLayoutProps) => {
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
  return <>{children}</>
}

export default CityLayout