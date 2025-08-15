import mongoose from "mongoose";

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB || "smartmeal";

if (!uri) throw new Error("Missing MONGODB_URI in .env.local");

/**
 * Reuse the Mongoose connection across hot-reloads in dev.
 * Avoids creating new connections on every request.
 */
let cached = (global as any).mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached!.conn) return cached!.conn;
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(uri, {
      dbName,
      // safe defaults
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
    });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
