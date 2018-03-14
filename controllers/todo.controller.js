'use strict'
const Todo = require('../models/todo.model');
const User = require('../models/user.model');

module.exports = {
    todo_list: (req, res) => {
        User.findById(req.body.id, (err, user) => {
            res.status(200).send({
                message: 'Todo-List',
                data: {
                    name: user.name,
                    email: user.email,
                    todo: user.todo
                }
            });
        }).populate('todo');
    },

    create_todo: (req, res) => {
        let new_todo = new Todo({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            deadline: req.body.deadline
        });
        
        new_todo.save(err => {
            if (err) return res.status(500).send({ message: err });

            User.findById(req.body.id, (err, user) => {
                user.todo.push(new_todo._id);
                user.save(err => {
                    if (err) return res.status(500).send({ message: err });

                    return res.status(201).send({ 
                        message: 'Create new todo success',
                        data: new_todo
                    });
                });
            });
        });
    },

    edit_todo: (req, res) => {
        Todo.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
            if (err) return res.status(500).send({ message: err });

            return res.status(200).send({
                message: 'Update todo success'
            });
        });
    },

    delete_todo: (req, res) => {
        User.findById(req.body.id, (err, user) => {
            if (err) return res.status(500).send({ message: err });

            user.todo.remove(req.params.id);
            user.save(err => {
                if (err) return res.status(500).send({ message: err });

                Todo.findByIdAndRemove(req.params.id, (err, todo) => {
                    if (err) return res.status(500).send({ message: err });
    
                    return res.status(200).send({ message: 'Delete todo success' });
                })
            });
        });
    }
};