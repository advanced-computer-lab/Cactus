const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
    departureId : {type:String},
    returnId : {type:String},
    destination : {type:String},
    return : {type:String},
    departureDate : {type: String},
    departureTime : {type: String},
    returnDate : {type: String},
    returnTime : {type: String},
    seats : {type:Number},
    cabin : {type:String},
    departurePrice : {type:Number},
    returnPrice : {type:Number},
    depSeatNumbers: {type:[Number]},
    retSeatNumbers: {type:[Number]}
}, { timestamps : true });


const Reservation = mongoose.model('Reservation', reservationSchema)

module.exports = Reservation;