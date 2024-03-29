import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to DB"));

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {});

app.listen(7000, () => {
  console.log("Success");
});
