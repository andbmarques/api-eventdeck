import { Router } from "express";
import { create, findAll } from "../controllers/events.controller.js";

const route = Router();

route.post("/", create);
route.get("/", findAll);

export default route;
