import User from "../models/User.js";
import jwt from "jsonwebtoken";

const login = (email) => User.findOne({ email: email }).select("+password");

const generateToken = (id) =>
  jwt.sign({ id: id }, process.env.JwtSecret, { expiresIn: 86400 });

export { login, generateToken };
