const route = require('express').Router();
const getUser = require('../controllers/user.controller');

route.get('/user', getUser.getUser)

module.exports = route;