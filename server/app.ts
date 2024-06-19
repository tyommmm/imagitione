import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import cookieParser from "cookie-parser";
import { generateText } from "./src/controllers/textController";
import connectDB from "./src/config/db";
import router from "./src/router";

dotenv.config();

const app = express();

connectDB();

app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(express.json());

app.use("/", router());

app.get("/generate-text", (req, res) => {
  res.send("hello"); // TODO
});

app.post("/generate-suggestions", generateText);

app.listen(() => {
  console.log(`Server is running on port`);
});
