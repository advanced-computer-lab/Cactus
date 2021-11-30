const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    id:{
        type:String
    },
    flightNumber: {
        type: String,
        required: true,
        unique: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    departureDate: {
        type: String,
        required: true
    },
    arrivalDate: {
        type: String,
        required: true
    },
    destCountry: {
        type: String,
        required: true
    },
    destinationAirport: {
        type: String,
        required: true
    },
    depCountry: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    planeType: {
        type: String,
        required: true
    },
    economySeats: {
        type: Number,
        required: true
    },
    economyPrice:{
        type: Number,
        required: true
    },
    businessPrice:{
        type: Number,
        required: true
    },
    availableEconomy: {
        type: Number
    },
    economyMap: {
        type: [
            {
            number: {type:Number}, 
            reserved: {type:Boolean}
            }
            ]
    },
    availableBusiness: {
        type: Number
    },
    businessMap: {
        type: [
            {
            number: {type:Number}, 
            reserved: {type:Boolean}
            }
            ]
    },
    businessSeats: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const Flight = mongoose.model('Flight', flightSchema)

module.exports = Flight;