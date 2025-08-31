// import mongoose from "mongoose";
// import "dotenv/config";

// const MONGODB_URL = process.env.MONGODB_URL;

// if (!MONGODB_URL) {
//   throw new Error("No MondoDB URL");
// }

// export const MongoConnect = () => {
//   mongoose.connect(MONGODB_URL);
//   console.log("Working DB");
// };

import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async (): Promise<void> => {
  const MONGODB_URL = process.env.MONGODB_URL;
  if (!MONGODB_URL) {
    console.error("Missing MONGODB_URL in env");
    throw new Error("Missing MONGODB_URL");
  }
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("connected to DB");
  } catch (err: unknown) {
    console.error("Error connecting DB", err);
    throw err;
  }
};