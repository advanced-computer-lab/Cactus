//___________Middleware___________
const express = require('express')
const FlightRouter = express.Router()
const mongoose = require('mongoose')

//___________Schema___________
const Flight = require('../../Schemas/Flight')

//___________Flight Router___________
FlightRouter.use(express.json())

// ________Add a New Flight________
FlightRouter.post('/addFlight', (req, res) => {
    const flight = new Flight({ 
        'flightNumber': req.body.flightNumber,
        'departureTime': req.body.departureTime,
        'arrivalTime': req.body.arrivalTime,
        'departureDate': req.body.departureDate,
        'arrivalDate': req.body.arrivalDate,
        'destinationAirport': req.body.destinationAirport,
        'departureAirport': req.body.departureAirport,
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

// ________Find All Flights and Filter________
FlightRouter.post('/findFlight',(req,res) =>{
    var f1=new Flight()


    if(req.body.flightNumber){
        var field = "flightNumber"
        f1[field]=req.body.flightNumber
    }
    if(req.body.departureTime){
        field = "departureTime"
        f1[field]=req.body.departureTime
    }
    if(req.body.arrivalTime){
        field = "arrivalTime"
        f1[field]=req.body.arrivalTime
    }
    if(req.body.departureDate){
        field = "departureDate"
        f1[field]=req.body.departureDate
    }
    if(req.body.arrivalDate){
        field = "arrivalDate"
        f1[field]=req.body.arrivalDate
    }
    if(req.body.airport){
        field = "airport"
        f1[field]=req.body.airport
    }

    Flight.find(f1)
        .then((result)=>{
        res.send(result)
        console.log(result)
        })
        .catch((err)=>{
        console.log(err)
        })

})
  
// ________Find All Flights________
FlightRouter.get('/findFlight',(req,res)=>{
    Flight.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})

// ________Delete a Flight________
FlightRouter.delete('/deleteFlight/:id',(req,res) =>{
    Flight.findById(req.params.id)
        .then(flight => flight.remove().then(() => res.json({success: true})))
        .catch(er => res.status(404).json({success: false}))
})

// ________Edit a Flight________
FlightRouter.put('/updateFlight/:id',(req,res) =>{
    Flight.findById(req.params.id)
    .then(flight => {
    if(req.body.flightNumber){
      flight.flightNumber = req.body.flightNumber
    }
    if(req.body.departureTime){
        flight.departureTime = req.body.departureTime
    }
    if(req.body.arrivalTime){
        flight.arrivalTime= req.body.arrivalTime
    }
    if(req.body.departureDate){ 
        flight.departureDate= req.body.departureDate
    }
    if(req.body.arrivalDate){ 
        flight.arrivalDate= req.body.arrivalDate
    }
    if(req.body.destinationAirport){
        flight.destinationAirport= req.body.destinationAirport
    }
    if(req.body.departureAirport){
        flight.departureAirport= req.body.departureAirport
    }
        flight.save().then(() => res.json({success: true}))})
    .catch(er => res.status(404).json({success: false}))
})


module.exports = FlightRouter;