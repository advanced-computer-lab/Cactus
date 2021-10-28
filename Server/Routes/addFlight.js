const express = require('express')
const addFlightRouter = express.Router()
const mongoose = require('mongoose')
const Flight = require('../Schemas/Flight')


// addFlightRouter.get('/',(req,res)=>{
//    // res.render(addFlight) //TODO
// })

addFlightRouter.get('/',(req,res)=>{
    const flight = {
        'flightNumber': 'D40',
        'departureTime': '5:22',
        'arrivalTime': '10:00',
        'departureDate': '25/4/2000',
        'arrivalDate':'25/4/2000' ,
        'airport': 'Egypt',
        'economySeats': 10, 
        'businessSeats': 5
    }
    Flight.save(flight)
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

module.exports = addFlightRouter;