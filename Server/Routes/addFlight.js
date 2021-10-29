const express = require('express')
const addFlightRouter = express.Router()
const mongoose = require('mongoose')
const Flight = require('../Schemas/Flight')


// addFlightRouter.get('/',(req,res)=>{
//    // res.render(addFlight) //TODO
// })

addFlightRouter.get('/', (req, res) => {
    const flight = new Flight({
        '_id': 'check000',
        'flightNumber': 'D40',
        'departureTime': '5:22',
        'arrivalTime': '10:00',
        'departureDate': '4/25/2000',
        'arrivalDate': '4/25/2000',
        'airport': 'Egypt',
        'economySeats': 10,
        'businessSeats': 5
    });
    flight.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = addFlightRouter;