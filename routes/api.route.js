const express = require('express');
const router = express.Router();
const { signin, signup } = require('../controllers/user.controller');

module.exports = router
    .get('/', (req, res) => res.status(200).send({ message: 'Welcome to To-Do-Fancy-API' }))
    .post('/signin', signin)
    .post('/signup', signup)