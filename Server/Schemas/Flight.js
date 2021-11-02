const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    flightNumber: {
        type: String,
        required: true
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
    airport: {
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

//flightNo, DeparTime, ArrivalTime, Dates, airport, number seats

const Flight = mongoose.model('Flight', flightSchema)

module.exports = Flight;