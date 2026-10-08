import { MongoClient } from "mongodb";

const uri = process.env.BETTER_AUTH_MONGODB_URL;

if (!uri) {
  throw new Error("BETTER_AUTH_MONGODB_URL is not set");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

export const mongoDb = mongoClient.db("bazardor");
