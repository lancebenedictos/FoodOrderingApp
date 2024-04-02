import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
var bodyParser = require("body-parser");

import myRestaurantRoute from "./routes/MyRestaurantRoute";
import userRoutes from "./routes/UserRoutes";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("connected to DB"));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(bodyParser.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "Health ok" });
});

app.use("/api/my/user", userRoutes);
app.use("/api/my/restaurant", myRestaurantRoute);

app.listen(7000, () => {
  console.log("Success");
});
