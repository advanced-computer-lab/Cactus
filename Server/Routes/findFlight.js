const express = require('express')
const findFlightRouter = express.Router()
const mongoose = require('mongoose')
const Flight = require('../Schemas/Flight')
const bp = require('body-parser')
findFlightRouter.use(bp.json())
findFlightRouter.use(bp.urlencoded({extended: true}))

findFlightRouter.post('/',(req,res) =>{
  var f1=new Flight()


  if(req.body._id){
    var field = "_id"
    f1[field]=req.body._id
}
  if(req.body.flightNumber){
    field = "flightNumber"
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
    })
    .catch((err)=>{
      console.log(err)
    })

})


findFlightRouter.get('/',(req,res)=>{ //TODO:
    Flight.find({
      "_id": "check000"
      //"flightNumber": ,
      // "departureTime": ,
      // "arrivalTime":,
      // "departureDate": ,
      // "arrivalDate":,
      // "airport":
    })
      .then((result)=>{
        res.send(result)
      })
      .catch((err)=>{
        console.log(err)
      })
})


module.exports = findFlightRouter;