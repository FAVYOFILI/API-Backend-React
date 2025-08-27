import express from "express";
import "dotenv/config";
import { MongoConnect } from "./config/Config";
import { userRouter } from "./Router/Router";
import cors from "cors";

const app: express.Application = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT;
MongoConnect();

app.use("/api", userRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
