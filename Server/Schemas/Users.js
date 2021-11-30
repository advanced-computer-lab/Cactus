const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Reservation = require('../Schemas/Reservation').schema

const UserSchema = new Schema({
    firstname:{
        type:String,
        required: true,
        min: 2,
        max: 25,
    },
    lastname:{
        type:String,
        required: true,
        min: 2,
        max: 25,
    },
    dateOfBirth: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
        max:50,
        unique:true
    },
    username: {
        type:String,
        required: true,
        min: 3,
        max: 20,
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

    passportNumber:{
        type:Number   
    },
    gender: {
        type:String,
        required: true,
    },

	telephones:{
	type:[Number]
	},

	homeAddress:{
        country: {type:String},
        city: {type:String}
	},

	countryCode:{
	type:[String]
	},
    
    reservations: {
    type: [Reservation]
    }
})
const User = mongoose.model('User', UserSchema)
module.exports = User;