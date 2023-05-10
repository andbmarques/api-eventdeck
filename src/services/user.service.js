const User = require("../models/User");

const createService = (body) => User.create(body);
const findAll = () => User.find();
const findById = (id) => User.findById(id);

module.exports = {
  createService,
  findAll,
  findById,
};
