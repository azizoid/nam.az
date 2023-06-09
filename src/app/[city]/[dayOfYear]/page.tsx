import Joi from 'joi'

import ErrorPage from '@/app/error'
import { cityRule, dayOfYearRule } from '@/assets/joiValidationRules'

import { generateMetadata as generateCityMetadata } from '../page'

import { DayOfYearPageView } from './pageView'

const schema = Joi.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
})

type DayOfYearPageProps = { params: { city: string, dayOfYear: string } }

export const generateMetadata = generateCityMetadata

const DayOfYearPage = ({ params }: DayOfYearPageProps) => {
  const { city = null, dayOfYear = null } = params

  // Validate city query using Joi
  const { value, error } = schema.validate({ city: Number(city), dayOfYear: Number(dayOfYear) })

  if (error) {
    return <ErrorPage />
  }

  return <DayOfYearPageView city={value.city} dayOfYear={value.dayOfYear} />
}

export default DayOfYearPage