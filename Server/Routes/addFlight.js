const express = require('express')
const addFlightRouter = express.Router()
const mongoose = require('mongoose')
const Flight = require('../Schemas/Flight')
addFlightRouter.use(express.json())


addFlightRouter.get('/',(req,res)=>{ //TODO:
   
})

addFlightRouter.post('/', (req, res) => {
    console.log(req.body)
    const flight = new Flight({
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