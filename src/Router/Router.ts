import express from "express";
import {
  DeleteAll,
  DeleteOne,
  GetAll,
  GetOne,
  Login,
  Signup,
  Update,
} from "../Controller/Controller";

export const userRouter: express.Router = express.Router();

userRouter.post("/signup", Signup);
userRouter.post("/login", Login);
userRouter.patch("/update/:id", Update);
userRouter.get("/getone/:id", GetOne);
userRouter.get("/getall", GetAll);
userRouter.delete("/deleteone/:id", DeleteOne);
userRouter.delete("/deleteall", DeleteAll);
