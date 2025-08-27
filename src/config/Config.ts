import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("No MondoDB URL");
}

export const MongoConnect = () => {
  mongoose.connect(MONGODB_URL);
  console.log("Working DB");
};
