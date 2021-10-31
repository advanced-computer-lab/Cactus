const express = require('express')
const addFlightRouter = express.Router()
const mongoose = require('mongoose')
const Flight = require('../Schemas/Flight')


addFlightRouter.get('/',(req,res)=>{ //TODO:
   
})

addFlightRouter.post('/', (req, res) => {
    const flight = new Flight({
        '_id': 'check002',
        'flightNumber': 'D20',
        'departureTime': '6:22',
        'arrivalTime': '10:00',
        'departureDate': '7/25/2000',
        'arrivalDate': '8/25/2000',
        'airport': 'Egypt',
        'economySeats': 80,
        'businessSeats': 15
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