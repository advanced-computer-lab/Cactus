const express = require('express')
const FlightRouter = express.Router()
const mongoose = require('mongoose')
const Flight = require('../Schemas/Flight')
const bp = require('body-parser')
FlightRouter.use(bp.json())
FlightRouter.use(bp.urlencoded({extended: true}))

FlightRouter.post('/addFlight', (req, res) => {
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
  
  
  FlightRouter.get('/findFlight',(req,res)=>{ //TODO:
      Flight.find()
        .then((result)=>{
          res.send(result)
        })
        .catch((err)=>{
          console.log(err)
        })
  })


  FlightRouter.delete('/deleteFlight/:id',(req,res) =>{
    Flight.findById(req.params.id)
    .then(flight => flight.remove().then(() => res.json({success: true})))
    .catch(er => res.status(404).json({success: false}))
})

FlightRouter.put('/updateFlight/:id',(req,res) =>{



    Flight.findById(req.params.id)
    .then(flight => 
  
  {
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
    if(req.body.airport){
        flight.airport= req.body.airport
    }
        flight.save().then(() => res.json({success: true}))})
    .catch(er => res.status(404).json({success: false}))
})


module.exports = FlightRouter;