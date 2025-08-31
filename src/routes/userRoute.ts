// import express from "express";
// import {
//   DeleteAll,
//   DeleteOne,
//   GetAll,
//   GetOne,
//   Login,
//   Signup,
//   Update,
// } from "../Controller/Controller";

// export const userRouter: express.Router = express.Router();

// userRouter.post("/signup", Signup);
// userRouter.post("/login", Login);
// userRouter.patch("/update/:id", Update);
// userRouter.get("/getone/:id", GetOne);
// userRouter.get("/getall", GetAll);
// userRouter.delete("/deleteone/:id", DeleteOne);
// userRouter.delete("/deleteall", DeleteAll);


import express, { Router } from "express"
import {loginUser, signUpUser} from "../controller/userController"


const userRouter: Router = express.Router()

userRouter.post("/signup", signUpUser);
userRouter.post("/login", loginUser)

export {userRouter}
