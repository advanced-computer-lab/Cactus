const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true,
        min: 3,
        max: 20,
        unique:true
    },
    email: {
        type:String,
        required: true,
        max:50,
        unique:true
    },
    password: {
        type: String,
        required: true,
        max: 16,
        min: 6
    },
    isAdmin: {
        type: Boolean
    }
})
const User = mongoose.model('User', UserSchema)
module.exports = User;