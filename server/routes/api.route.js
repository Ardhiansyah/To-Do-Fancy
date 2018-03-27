const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

module.exports = router
    .get('/', (req, res) => res.status(200).send({ message: 'Welcome to To-Do-Fancy-API' }))
    .post('/signin', userController.signin)
    .post('/signup', userController.signup)
    .use('/todo', require('./todo.route'));