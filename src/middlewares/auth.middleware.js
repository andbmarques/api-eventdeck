import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userService from "../services/user.service.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ msg: "Unauthorized | Token not found " });
    }

    const [schema, token] = authorization.split(" ");

    if ([schema, token].length !== 2) {
      return res.status(401).json({ msg: "Unauthorized | Invalid Token" });
    }

    if (schema !== "Bearer") {
      return res.status(401).json({ msg: "Unauthorized | Invalid Token" });
    }

    jwt.verify(token, process.env.JwtSecret, async (error, decoded) => {
      if (error)
        return res.status(401).json({ msg: "Unauthorized | Invalid Token" });

      const user = await userService.findById(decoded.id);

      if (!user || !user._id) {
        return res.status(401).json({ msg: "Unauthorized | Invalid Token" });
      }

      req.userId = user._id;

      return next();
    });
  } catch (error) {
    console.log("\n\x1b[31m[Server Error] " + error.message + "\x1b[0m\n");
    return res.status(500).json({ msg: "Server Error: " + error.message });
  }
};
