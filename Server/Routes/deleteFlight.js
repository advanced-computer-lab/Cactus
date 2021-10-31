const express = require('express')
const deleteFlightRouter = express.Router()
const mongoose = require('mongoose')
const Flight = require('../Schemas/Flight')
const bp = require('body-parser')
deleteFlightRouter.use(bp.json())
deleteFlightRouter.use(bp.urlencoded({extended: true}))

deleteFlightRouter.delete('/:id',(req,res) =>{
    Flight.findById(req.params.id)
    .then(flight => flight.remove().then(() => res.json({success: true})))
    .catch(er => res.status(404).json({success: false}))
})


module.exports = deleteFlightRouter;