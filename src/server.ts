// import express from "express";
// import "dotenv/config";
// import { MongoConnect } from "./config/Config";
// import { userRouter } from "./Router/Router";
// import cors from "cors";

// const app: express.Application = express();
// app.use(express.json());
// app.use(cors());
// const port = process.env.PORT;
// MongoConnect();

// app.use("/api", userRouter);

// app.listen(port, () => {
//   console.log(`http://localhost:${port}`);
// });

import express, { Express,} from "express"
// import * as dotenv from "dotenv"
import "dotenv/config"
import { userRouter } from "./routes/userRoute";
import { connectDB } from "./config/db";
import cors from "cors"
// dotenv.config


const app: Express = express();
const port = process.env.PORT
connectDB()
// const dotenv = process.env

app.use(express.json())
app.use(cors())

app.use("/api", userRouter)

app.listen(port, () => {
    console.log (`Our port is here http://localhost:${port}`)
});