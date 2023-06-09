import Joi from 'joi'

import ErrorPage from '@/app/error'
import { coordinates } from '@/assets/coordinates'
import { cityRule, dayOfYearRule } from '@/assets/joiValidationRules'

import { DayOfYearPageView } from './pageView'

const schema = Joi.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
})

type DayOfYearPageProps = { params: { city: string, dayOfYear: string } }

export async function generateMetadata({ params }: DayOfYearPageProps) {
  const { city = null } = params

  const title = coordinates.find(({ id }) => id === Number(city))?.city

  return {
    title,
    openGraph: { title },
    twitter: { title }
  }
}

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