import { NextApiRequest, NextApiResponse } from 'next';
import { getDayOfYear } from 'date-fns'
import { connectToDatabase } from '@/utilities/connectToDatabase/connectToDatabase';
import { leapYearOffset } from '@/utilities/leapYearOffset/leapYearOffset';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await connectToDatabase()
  const db = client.db(process.env.MONGODB_DB).collection(process.env.MONGODB_COLLECTION || '')

  try {
    const {
      query: { city },
      method,
    } = req;

    switch (method) {
      case 'GET': {

        const dd = leapYearOffset(getDayOfYear(new Date()))
        const query = { city: Number(city), dd }

        const prayerTimes = await db.findOne(query);

        if (!prayerTimes) {
          return res.status(404).json({ message: 'Date not found' });
        }

        return res.status(200).json(prayerTimes);
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