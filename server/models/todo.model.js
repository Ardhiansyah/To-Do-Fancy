'use strict'
const timestamps = require('mongoose-timestamp');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Todo', new Schema({
    checked: { type: Boolean, default: false },
    description: String,
})
.plugin(timestamps));