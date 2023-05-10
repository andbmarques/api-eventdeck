const User = require("../models/User");

const createService = (body) => User.create(body);
const findAll = () => User.find();
const findById = (id) => User.findById(id);
const update = (id, name, username, email, role, docId, password) =>
  User.findOneAndUpdate(
    { _id: id },
    { name, username, email, role, docId, password }
  );

module.exports = {
  createService,
  findAll,
  findById,
  update,
};
