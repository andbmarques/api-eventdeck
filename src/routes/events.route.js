import { Router } from "express";
import {
  create,
  findAll,
  findById,
  topEvents,
  searchByTitle,
} from "../controllers/events.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/", authMiddleware, create);
route.get("/", findAll);
route.get("/top", topEvents);
route.get("/search", searchByTitle);
route.get("/:id", authMiddleware, findById);

export default route;
