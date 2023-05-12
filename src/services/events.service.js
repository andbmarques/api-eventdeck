import Events from "../models/Events.js";

const createService = (body) => Events.create(body);
const findAllService = async (offset, limit) =>
  await Events.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("producer");
const countEvents = () => Events.countDocuments();

export { createService, findAllService, countEvents };
