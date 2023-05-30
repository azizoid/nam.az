import { ReactNode } from 'react'

import { Metadata } from 'next'

import { coordinates } from '@/assist/coordinates'

import { CityPageProps } from './page'

type CityLayoutProps = {
  children: ReactNode
}

export const generateMetadata = async (
  { params }: CityPageProps,
): Promise<Metadata> => {
  const { city } = params
  const cityTitle = coordinates.find(({ id }) => id === Number(city))?.city

  return {
    ...(cityTitle && { title: `${cityTitle} vaxtı` }),
  }
}

const CityLayout = ({ children }: CityLayoutProps) => {
  return children
}

export default CityLayout