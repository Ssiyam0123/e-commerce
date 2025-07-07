import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error('⚠️ Please define the MONGODB_URI in .env.local');
}

// Global caching to prevent multiple connections in dev
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectMongo() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).then((mongooseInstance) => {
      console.log('✅ MongoDB connected');
      console.log('📌 Using DB:', mongooseInstance.connection.name); // ← current DB name
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

