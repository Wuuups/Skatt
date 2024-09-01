import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
console.log('MongoDB URI:', uri)

let client
let clientPromise

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
  console.log('Using existing global MongoClient promise for development environment')
} else {
  client = new MongoClient(uri)
  clientPromise = client.connect()
  console.log('Creating a new MongoClient for production environment')
}

clientPromise
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB', error))

export default clientPromise
