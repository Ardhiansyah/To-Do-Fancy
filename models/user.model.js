'use strict'
const timestamps = require('mongoose-timestamp');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const hash = require('../middlewares/hash.middleware');

module.exports = mongoose.model('User', new Schema({
    name: String,
    email: { 
        type: String,
        unique: true,
        validate: {
            isAsync: true,
            validator: (value, next) => {
                let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let msg = `${value} is not a valid email!`;
                next(regex.test(value), msg);
            }
        }
    },
    password: String,
    todo: [{ type: Schema.ObjectId, ref: 'Todo' }]
})
.plugin(timestamps)
.plugin(uniqueValidator)
.pre('save', function() {
    if (this.password) this.password = hash.generate(this.password);
}));