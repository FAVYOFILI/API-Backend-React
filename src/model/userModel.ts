// import mongoose from "mongoose";

// export interface Iuser {
//   Firstname: string;
//   Middlename: string;
//   Lastname: string;
//   Email: string;
//   Phonenumber: number;
//   Password: string;
//   Username: string;
//   City: string;
//   State: string,
//   Age: string,
//   Country: string,
// }

// export const userSchema = new mongoose.Schema({
//   Firstname: { type: String, required: true },
//   Middlename: { type: String, required: true },
//   Lastname: { type: String, required: true },
//   Email: { type: String, required: true, unique: true },
//   Phonenumber: { type: Number, required: true, unique: true },
//   Password: { type: String, required: true },
//   Username: { type: String, required: true },
//   City: { type: String, required: true },
//   State: { type: String, required: true},
//   Age: { type: String, required: true },
//   Country: { type: String, required: true },
// });

// export const userModel = mongoose.model("userModel", userSchema);


import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: mongoose.Schema<IUser> = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const userModel = mongoose.model<IUser>("user", userSchema);