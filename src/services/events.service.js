import Events from "../models/Events.js";

const createService = (body) => Events.create(body);
const findAllService = () => Events.find();

export { createService, findAllService };
