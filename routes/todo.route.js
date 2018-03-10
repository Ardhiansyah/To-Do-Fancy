const router = require('express').Router();
const { todo_list, create_todo, edit_todo, delete_todo } = require('../controllers/todo.controller');
const { verify } = require('../middlewares/token.middleware');

module.exports = router
    .use(verify)
    .get('/', todo_list)
    .post('/', create_todo)
    .put('/:id', edit_todo)
    .delete('/:id', delete_todo);