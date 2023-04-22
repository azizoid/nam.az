import { NextApiRequest, NextApiResponse } from 'next';
import { generateDates, leapYearOffset } from '@/utilities';
import { connectToDatabase } from '@/utilities/connectToDatabase/connectToDatabase';
import Joi from 'joi';
import { cityRule, dayOfYearRule } from '@/assist/joiValidationRules';

const schema = Joi.object({
  city: cityRule,
  dayOfYear: dayOfYearRule
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await connectToDatabase()
  const db = client.db(process.env.MONGODB_DB).collection(process.env.MONGODB_COLLECTION || '')

  try {
    const {
      query: { city, dayOfYear },
      method,
    } = req;

    const { value: validationValue, error: validationError } = schema.validate({ city, dayOfYear })
    console.log({ validationValue, validationError })
    if (validationError) {
      return res.status(404).json({ message: 'City or Date not found' });
    }

    const tempLeapYearAdjustment = leapYearOffset(Number(validationValue.dayOfYear))
    const dd = tempLeapYearAdjustment + Number(validationValue.dayOfYear) // TODO: rename to `dayOfYearWithLeapYearAdjustment`
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