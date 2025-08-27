import express, { Request, Response } from "express";
import argon2 from "argon2";
import { userModel } from "../Model/Model";

export const Signup = async (req: Request, res: Response): Promise<void> => {
  const {
    firstname,
    middlename,
    lastname,
    email,
    phonenumber,
    password,
    username,
  } = req.body;
  //http://localhost:3400/api/getall
  try {
    if (
      !firstname ||
      !lastname ||
      !middlename ||
      !email ||
      !phonenumber ||
      !password ||
      !username
    ) {
      res.status(400).json({ message: "please fill all fields" });
    }
    if (
      password &&
      email &&
      username &&
      firstname &&
      middlename &&
      lastname &&
      phonenumber
    ) {
      const userExists = await userModel.findOne({ email });
      if (userExists) {
        res.status(400).json({ message: "User Already Exists" });
        return;
      }
      const hashedPassword = await argon2.hash(password);

      const newUser = await userModel.create({
        firstname,
        lastname,
        middlename,
        email,
        password: hashedPassword,
        phonenumber,
        username,
      });
      res
        .status(200)
        .json({ message: "user created successfully", user: newUser });
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server Error", err: err.message });
  }
};

export const Login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(400).json({ message: "please fill all fields" });
    }
    if (username && password) {
      const userExists = await userModel.findOne({ username });
      if (!userExists) {
        res.status(400).json({ message: "User does not exist" });
      }
      if (userExists) {
        const ismatch = await argon2.verify(userExists.password, password);
        if (!ismatch) {
          res.status(401).json({ message: "Incorrect password" });
        }
        if (ismatch) {
          res.status(200).json({
            message: "user logged in sucessfully",
            data: userExists,
          });
        }
      }
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server Error", err: err.message });
  }
};

export const Update = async (req: Request, res: Response): Promise<void> => {
  const {
    firstname,
    middlename,
    lastname,
    email,
    phonenumber,
    password,
    username,
  } = req.body;
  try {
    const hashedPassword = await argon2.hash(password);
    const userUpdate = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        firstname,
        middlename,
        lastname,
        email,
        phonenumber,
        password: hashedPassword,
        username,
      },
      { new: true }
    );
    res.status(200).json({ message: "User updated", data: userUpdate });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server Error", err: err.message });
  }
};

export const GetOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const getUser = await userModel.findById(req.params.id);
    if (!getUser) {
      res.status(404).json({ message: "User not found" });
    }
    if (getUser) {
      res.status(200).json({ message: "This is your user", data: getUser });
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server Error", err: err.message });
  }
};

export const GetAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const getUsers = await userModel.find();
    if (!getUsers) {
      res.status(404).json({ message: "no users" });
    }
    if (getUsers) {
      res.status(200).json({  getUsers });
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server Error", err: err.message });
  }
};
export const DeleteOne = async (req: Request, res: Response): Promise<void> => {
  try {
    const userExists = await userModel.findById(req.params.id);
    if (!userExists) {
      res.status(404).json({ message: "User not found" });
    }
    if (userExists) {
      const deleteUser = await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User deleted successfully" });
    }
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server Error", err: err.message });
  }
};

export const DeleteAll = async (req: Request, res: Response): Promise<void> => {
  try {
    await userModel.deleteMany();
    res.status(200).json({ message: "Users deleted successfully" });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: "Internal server Error", err: err.message });
  }
};
