const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    date: Date,
    gender: String,
    fathersname: String
});

module.exports = mongoose.model('User', userSchema);