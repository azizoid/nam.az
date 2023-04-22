import { NextApiRequest, NextApiResponse } from 'next';
import { getDayOfYear } from 'date-fns'
import { generateDates, leapYearOffset } from '@/utilities';
import { connectToDatabase } from '@/utilities/connectToDatabase/connectToDatabase';
import Joi from 'joi';
import { cityRule } from '@/assist/joiValidationRules';

const schema = Joi.object({
  city: cityRule,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await connectToDatabase()
  const db = client.db(process.env.MONGODB_DB).collection(process.env.MONGODB_COLLECTION || '')

  try {
    const {
      query: { city },
      method,
    } = req;

    const { value: validationValue, error: validationError } = schema.validate({ city })
    if (validationError) {
      return res.status(404).json({ message: 'City not found' });
    }

    const dayOfYear = getDayOfYear(new Date())
    const tempLeapYearAdjustment = leapYearOffset(dayOfYear)
    const dd = tempLeapYearAdjustment + dayOfYear // TODO: rename to `dayOfYearWithLeapYearAdjustment`
    const query = { city: validationValue.city, dd }

    switch (method) {
      case 'GET': {
        const prayerTimes = await db.findOne(query);

        if (!prayerTimes) {
          return res.status(404).json({ message: 'Date not found' });
        }

        const twoDates = generateDates({ m: prayerTimes.m, d: prayerTimes.d })

        return res.status(200).json({ ...prayerTimes, dd: prayerTimes.dd - tempLeapYearAdjustment, ...twoDates });
      }

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    if (client) {
      await client.close();
    }
  }
}