// import express, { Request, Response } from "express";
// import argon2 from "argon2";
// import { userModel } from "../Model/Model";

// export const Signup = async (req: Request, res: Response): Promise<void> => {
//   const {
//     Firstname,
//   Middlename,
//   Lastname,
//   Email,
//   Phonenumber,
//   Password,
//   Username,
//      City,
//   State,
//   Age,
//   Country
//   } = req.body;
 
//   try {
//     if (
//       !Firstname ||
//       !Middlename ||
//       !Lastname ||
//       !Email ||
//       !Phonenumber ||
//       !Password ||
//       !Username ||
//       !City ||
//       !State ||
//       !Age ||
//       !Country
//     ) {
//       res.status(400).json({ message: "please fill all fields" });
//     }
//     if (
//       (Firstname &&
//       Middlename &&
//       Lastname &&
//       Email &&
//       Phonenumber &&
//       Password &&
//       Username &&
//       City &&
//       State &&
//       Age &&
//       Country)
//     ) {
//       const userExists = await userModel.findOne({ Email });
//       if (userExists) {
//         res.status(400).json({ message: "User Already Exists" });
//         return;
//       }
//       const hashedPassword = await argon2.hash(Password);

//       const newUser = await userModel.create({
//         Firstname,
//         Middlename,
//         Lastname,
//         Email,
//         Phonenumber,
//         Password,
//         Username,
//         City,
//         State,
//         Age,
//         Country,
//       });
//       res
//         .status(200)
//         .json({ message: "user created successfully", data: newUser });
//     }

    
//   } catch (err: any) {
//     res
//       .status(500)
//       .json({ message: "Internal server Error", err: err.message });
//   }
// };

// export const Login = async (req: Request, res: Response): Promise<void> => {
//   const { username, password } = req.body;
//   try {
//     if (!username || !password) {
//       res.status(400).json({ message: "please fill all fields" });
//     }
//     if (username && password) {
//       const userExists = await userModel.findOne({ username });
//       if (!userExists) {
//         res.status(400).json({ message: "User does not exist" });
//       }
//       if (userExists) {
//         const ismatch = await argon2.verify(userExists.Password, password);
//         if (!ismatch) {
//           res.status(401).json({ message: "Incorrect password" });
//         }
//         if (ismatch) {
//           res.status(200).json({
//             message: "user logged in sucessfully",
//             data: userExists,
//           });
//         }
//       }
//     }
//   } catch (err: any) {
//     res
//       .status(500)
//       .json({ message: "Internal server Error", err: err.message });
//   }
// };

// export const Update = async (req: Request, res: Response): Promise<void> => {
//   const {
//     Firstname,
//     Middlename,
//     Lastname,
//     Email,
//     Phonenumber,
//     Password,
//     Username,
//     City,
//     State,
//     Age,
//     Country,
//   } = req.body;
//   try {
//     const hashedPassword = await argon2.hash(Password);
//     const userUpdate = await userModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         Firstname,
//         Middlename,
//         Lastname,
//         Email,
//         Phonenumber,
//         Password: hashedPassword,
//         Username,
//         City,
//         State,
//         Age,
//         Country,
//       },
//       { new: true }
//     );
//     res.status(200).json({ message: "User updated", data: userUpdate });
//   } catch (err: any) {
//     res
//       .status(500)
//       .json({ message: "Internal server Error", err: err.message });
//   }
// };

// export const GetOne = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const getUser = await userModel.findById(req.params.id);
//     if (!getUser) {
//       res.status(404).json({ message: "User not found" });
//     }
//     if (getUser) {
//       res.status(200).json({ message: "This is your user", data: getUser });
//     }
//   } catch (err: any) {
//     res
//       .status(500)
//       .json({ message: "Internal server Error", err: err.message });
//   }
// };

// export const GetAll = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const getUsers = await userModel.find();
//     if (!getUsers) {
//       res.status(404).json({ message: "no users" });
//     }
//     if (getUsers) {
//       res.status(200).json({  getUsers });
//     }
//   } catch (err: any) {
//     res
//       .status(500)
//       .json({ message: "Internal server Error", err: err.message });
//   }
// };
// export const DeleteOne = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const userExists = await userModel.findById(req.params.id);
//     if (!userExists) {
//       res.status(404).json({ message: "User not found" });
//     }
//     if (userExists) {
//       const deleteUser = await userModel.findByIdAndDelete(req.params.id);
//       res.status(200).json({ message: "User deleted successfully" });
//     }
//   } catch (err: any) {
//     res
//       .status(500)
//       .json({ message: "Internal server Error", err: err.message });
//   }
// };

// export const DeleteAll = async (req: Request, res: Response): Promise<void> => {
//   try {
//     await userModel.deleteMany();
//     res.status(200).json({ message: "Users deleted successfully" });
//   } catch (err: any) {
//     res
//       .status(500)
//       .json({ message: "Internal server Error", err: err.message });
//   }
// };


import { Request, Response } from "express";
import argon2 from "argon2";
import {IUser, userModel} from "../model/userModel"

export const signUpUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const {name, email, password} = req.body as Pick<IUser, "name" | "password" | "email">

        if (!name || !email || !password) {
            res.status(400).json({message: "Please all fileds are required"});
            return;
        }
        const findUser = await userModel.findOne({email})

        if (findUser) {
            res.status(409).json({message: "Email already exists"})
            return;
        }
        const hashPasword = await argon2.hash(password)
        const createUser = await userModel.create({
            name,
            email,
            password: hashPasword
        })

        res.status(201).json({success: true, message: "User created successfully", data:createUser})
    } catch (err: any) {
        res.status(500).json({message: " error occured", error: err.message})
        // res.status(500).json({message: " error occured", error: (err as Error).message || err})
    }
}

export const loginUser = async (req: Request, res: Response): Promise<void> =>{
    try {

        const {email, password} = req.body as Pick<IUser, "email" | "password">

        if (!email || !password) {
            res.status(400).json({message: "Missing email or password"});
            return;
        }

        const user: any = await userModel.findOne({email})

        if (!user) {
            res.status(401).json({message: "Invalid credentials"})
        }
        const isMatch = await argon2.verify(user.password, password)

        if (!isMatch) {
            res.status(401).json({message: "Invalid credentials"});
            return;
        }
        res.status(200).json({message: "Login successfully", name: user.name, email: user.email})
    } catch (err: any) {
        res.status(500). json({message: "An error occured", err: err.message})
    }
}