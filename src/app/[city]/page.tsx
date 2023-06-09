import Joi from 'joi'

import { coordinates } from '@/assets/coordinates'
import { cityRule } from '@/assets/joiValidationRules'

import ErrorPage from '../error'

import { CityPageView } from './pageView'

export type CityPageProps = { params: { city: string } }

const schema = Joi.object({
  city: cityRule,
})

export async function generateMetadata({ params }: CityPageProps) {
  const { city = null } = params

  const title = coordinates.find(({ id }) => id === Number(city))?.city

  return {
    title,
    openGraph: { title },
    twitter: { title }
  }
}

const CityPage = ({ params }: CityPageProps) => {
  const { city = null } = params

  // Validate city query using Joi
  const { value, error } = schema.validate({ city: Number(city) })

  if (error) {
    return <ErrorPage />
  }

  return <CityPageView city={value.city} />
}

export default CityPage