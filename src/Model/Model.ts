import mongoose from "mongoose";

export interface Iuser {
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  phonenumber: number;
  password: string;
  username: string;
}

export const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  middlename: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phonenumber: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
});

export const userModel = mongoose.model("userModel", userSchema);
