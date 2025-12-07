import { Db, MongoClient, MongoClientOptions } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI!
const MONGODB_DB = process.env.MONGODB_DB!

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

const connectToDatabase = async () => {
  // Reuse existing connection if available
  // MongoDB driver handles reconnection automatically if connection drops
  if (cachedClient && cachedDb) {
    return { db: cachedDb, client: cachedClient }
  }

  // Connection options for stability
  // MongoDB driver v7 has built-in connection pooling and auto-reconnect
  const opts: MongoClientOptions = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI, opts)
    const db = client.db(MONGODB_DB)

    cachedClient = client
    cachedDb = db

    return { db, client }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw new Error('Database connection failed')
  }
}

export async function withMongo<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  try {
    const conn = await connectToDatabase()
    return await fn(conn.db)
  } catch (error) {
    // MongoDB driver will automatically reconnect on next call
    // Just log and rethrow so calling code can handle it
    console.error('MongoDB operation failed:', error)
    throw error
  }
}
