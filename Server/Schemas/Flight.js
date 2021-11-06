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
        type: Date,
        required: true
    },
    arrivalDate: {
        type: Date,
        required: true
    },
    destinationAirport: {
        type: String,
        required: true
    },
    departureAirport: {
        type: String,
        required: true
    },
    economySeats: {
        type: Number,
        required: true
    },
    businessSeats: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const Flight = mongoose.model('Flight', flightSchema)

module.exports = Flight;