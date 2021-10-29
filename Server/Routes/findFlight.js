const express = require('express')
const findFlightRouter = express.Router()
const mongoose = require('mongoose')
const Flight = require('../Schemas/Flight')


findFlightRouter.get('/',(req,res)=>{ //TODO:
    Flight.find()
      .then((result)=>{
        res.send(result)
      })
      .catch((err)=>{
        console.log(err)
      })
})


module.exports = findFlightRouter;