import Joi from 'joi'

import { cityRule } from '@/assets/joiValidationRules'

import ErrorPage from '../error'

import { CityPageView } from './pageView'

export type CityPageProps = { params: { city: string } }

const schema = Joi.object({
  city: cityRule,
})

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