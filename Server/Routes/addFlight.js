const express = require('express')
const addFlightRouter = express.Router()
const mongoose = require('mongoose')
const Flight = require('../Schemas/Flight')


addFlightRouter.get('/',(req,res)=>{ //TODO:
   
})

addFlightRouter.post('/', (req, res) => {
    const flight = new Flight({
        '_id': req.body._id,
        'flightNumber': req.body.flightNumber,
        'departureTime': req.body.departureTime,
        'arrivalTime': req.body.arrivalTime,
        'departureDate': req.body.departureDate,
        'arrivalDate': req.body.arrivalDate,
        'airport': req.body.airport,
        'economySeats': req.body.economySeats,
        'businessSeats': req.body.businessSeats
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