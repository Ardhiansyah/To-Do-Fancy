const router = require('express').Router();
const todoController = require('../controllers/todo.controller');
const token = require('../middlewares/token.middleware');

module.exports = router
    .use(token.verify)
    .get('/', todoController.todo_list)
    .post('/', todoController.create_todo)
    .put('/:id', todoController.edit_todo)
    .delete('/:id', todoController.delete_todo);