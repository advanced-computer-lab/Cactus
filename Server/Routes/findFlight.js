const express = require('express')
const findFlightRouter = express.Router()
const mongoose = require('mongoose')
const Flight = require('../Schemas/Flight')

findFlightRouter.post('/',async (req,res) =>{
  let {search}= req.body
  console.log(search)
//   Flight.find({
//     "_id": search
//     // "departureTime": ,
//     // "arrivalTime":,
//     // "departureDate": ,
//     // "arrivalDate":,
//     // "airport":
// })
//     .then((result)=>{
//       res.send(result)
//     })
//     .catch((err)=>{
//       console.log(err)
//     })

})


findFlightRouter.get('/',(req,res)=>{ //TODO:
    Flight.find(
      // "flightNumber": ,
      // "departureTime": ,
      // "arrivalTime":,
      // "departureDate": ,
      // "arrivalDate":,
      // "airport":
    )
      .then((result)=>{
        res.send(result)
      })
      .catch((err)=>{
        console.log(err)
      })
})


module.exports = findFlightRouter;