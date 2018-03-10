const timestamps = require('mongoose-timestamp');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Todo', new Schema({
    title: String,
    category: String,
    description: String,
    deadline: Date
})
.plugin(timestamps));