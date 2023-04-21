import { MongoClient, ServerApiVersion } from 'mongodb';

export const connectToDatabase = async () =>
  await MongoClient.connect(process.env.MONGODB_URI || '', {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });