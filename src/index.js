/* require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./database/db"); */

import express from "express";
import connectDb from "./database/db.js";
import { config } from "dotenv";

import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

config();

const app = express();

const PORT = process.env.PORT || 4000;

connectDb();

app.use(express.json());
app.use("/user", userRoute);
app.use("/auth", authRoute);

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Hello world" });
});

app.listen(PORT, () => {
  console.log("\n\x1b[34m[server] Server running on PORT: \x1b[0m" + PORT);
});
