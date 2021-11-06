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
            result.id = result._id 
            result.save().then((res2) =>{
                res.send(res2)    
            })
            .catch((err) => {
                console.log(err.message)
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

// ________Find All Flights and Filter________
FlightRouter.post('/findFlight',(req,res) =>{
    var f1={}


    if(req.body.flightNumber){ 
        f1.flightNumber=req.body.flightNumber
    }
    if(req.body.departureTime){ 
        f1.departureTime=req.body.departureTime
    }
    if(req.body.arrivalTime){
        f1.arrivalTime = req.body.arrivalTime
    }
    if(req.body.departureDate){
        f1.departureDate = req.body.departureDate
    }
    if(req.body.arrivalDate){
        f1.arrivalDate=req.body.arrivalDate
    }
    if(req.body.economySeats){
        f1.economySeats=req.body.economySeats
    }
    if(req.body.businessSeats){
        f1.businessSeats=req.body.businessSeats
    }
    if(req.body.departureAirport){
        f1.departureAirport=req.body.departureAirport
    }
    if(req.body.destinationAirport){
        f1.destinationAirport=req.body.destinationAirport
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
            flight.flightNumber =  req.body.flightNumber
            flight.departureTime =  req.body.departureTime
            flight.arrivalTime=  req.body.arrivalTime
            flight.departureDate = req.body.departureDate
            flight.arrivalDate = req.body.arrivalDate
            flight.destinationAirport = req.body.destinationAirport
            flight.departureAirport = req.body.departureAirport
            flight.economySeats = req.body.economySeats
            flight.businessSeats = req.body.businessSeats
        flight.save().then(() => res.json({success: true}))})
    .catch(er => res.status(404).json({success: false}))
})


module.exports = FlightRouter;