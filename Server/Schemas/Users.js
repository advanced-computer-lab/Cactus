const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Reservation = require('../Schemas/Reservation').schema

const UserSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    firstName: {
        type:String,
        required: true,
        min: 2,
        max: 20
    },
    lastName: {
        type:String,
        required: true,
        min: 2,
        max: 20
    },
    dateOfBirth: {
        type:String,
        required: true,
    },
    username: {
        type:String,
        required: true,
        min: 2,
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
    },
    reservations: {
        type: [Reservation]
    },
    passportNumber: {
        type:String,
        required: true,
        unique:true
    },
    gender: {
        type:String,
        required: true,
    },
    phoneNumber: {
        type:String,
        unique: true,
        required: true,
    },
})
const User = mongoose.model('User', UserSchema)
module.exports = User;