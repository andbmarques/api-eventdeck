import { Router } from "express";
import {
  create,
  findAll,
  topEvents,
} from "../controllers/events.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/", authMiddleware, create);
route.get("/", findAll);
route.get("/top", topEvents);

export default route;
