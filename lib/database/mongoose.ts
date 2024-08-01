import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
interface mongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}
let cached: mongooseConnection = (global as any).Mongoose;
if (!cached) {
  cached = (global as any).Mongoose = {
    conn: null,
    promise: null,
  };
}
export const connectToMongodb = async () => {
  if (cached.conn) return cached.conn;
  if (!MONGODB_URL) throw new Error("missing mongo database url");
  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "imaginify",
      bufferCommands: false,
    });
  cached.conn = await cached.promise;
  return cached.conn;
};
