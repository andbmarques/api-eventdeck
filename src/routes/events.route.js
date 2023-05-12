import { Router } from "express";
import { create, findAll } from "../controllers/events.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/", authMiddleware, create);
route.get("/", findAll);

export default route;
