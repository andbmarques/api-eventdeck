import { Router } from "express";
import {
  create,
  findAll,
  findById,
  topEvents,
} from "../controllers/events.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/", authMiddleware, create);
route.get("/", findAll);
route.get("/top", topEvents);
route.get("/:id", findById);

export default route;
