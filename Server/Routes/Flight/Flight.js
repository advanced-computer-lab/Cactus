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
    const economyMap = []
    for( i=0;i<req.body.economySeats;i++){
        const obj = {
            number: (i+1),
            reserved: false 
        }
        economyMap.push(obj)
    }
    const businessMap = []
    for(i =0;i<req.body.businessSeats;i++){
        const obj = {
            number: (i+1),
            reserved: false
        }
        businessMap.push(obj)
    }
    const flight = new Flight({ 
        'flightNumber': req.body.flightNumber,
        'departureTime': req.body.departureTime,
        'arrivalTime': req.body.arrivalTime,
        'departureDate': req.body.departureDate,
        'arrivalDate': req.body.arrivalDate,
        'destinationAirport': req.body.destinationAirport,
        'departureAirport': req.body.departureAirport,
        'destCountry' : req.body.destCountry,
        'depCountry' : req.body.depCountry,
        'economySeats': req.body.economySeats,
        'businessSeats': req.body.businessSeats,
        'availableEconomy': req.body.economySeats,
        'availableBusiness': req.body.businessSeats,
        'economyPrice': req.body.economyPrice,
        'businessPrice': req.body.businessPrice,
        'planeType': req.body.planeType,
        'economyMap': economyMap,
        'businessMap': businessMap
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
    if(req.body.depCountry){
        f1.depCountry=req.body.depCountry
    }
    if(req.body.destCountry){
        f1.destCountry=req.body.destCountry
    }
    if(req.body.planeType){
        f1.planeType=req.body.planeType
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
    const economyMap = []
    for( i=0;i<req.body.economySeats;i++){
        const obj = {
            number: (i+1),
            reserved: false 
        }
        economyMap.push(obj)
    }
    const businessMap = []
    for(i =0;i<req.body.businessSeats;i++){
        const obj = {
            number: (i+1),
            reserved: false
        }
        businessMap.push(obj)
    }
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
            flight.availableBusiness = req.body.availableBusiness
            flight.availableEconomy = req.body.availableEconomy
            flight.economyPrice = req.body.economyPrice
            flight.businessPrice = req.body.businessPrice
            flight.planeType = req.body.planeType
            flight.destCountry = req.body.destCountry
            flight.depCountry = req.body.depCountry
            flight.businessMap = businessMap
            flight.economyMap = economyMap
        flight.save().then(() => res.json({success: true}))})
    .catch(er => res.status(404).json({success: false}))
})


module.exports = FlightRouter;