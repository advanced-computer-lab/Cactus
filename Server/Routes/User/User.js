//___________Middleware___________
const express = require('express')
const UserRouter = express.Router()
const mongoose = require('mongoose')

//___________Schema___________
const User = require('../../Schemas/Users')
const Flight = require('../../Schemas/Flight')

//___________Flight Router___________
UserRouter.use(express.json())


UserRouter.delete('/deleteUser/:username',(req,res) =>{
    User.find(req.params.username)
    .then((user) =>user.remove().then(() => res.json({success: true})))
    .catch(er => res.status(404).json({success: false}))
})

UserRouter.post('/addUser', (req,res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
        flights: []
    })
    user.save().then(() => res.send({success:true}))
    .catch(err => console.log(err))
})

UserRouter.post('/getFlights', (req, res) => {
    var flights =[]
    Flight.find()
        .then((result)=>{
            for (var i = 0; i < result.length; i++){
                var Flag =  true
                if(result[i].departureDate !== req.body.departureDate)
                    Flag = false
                if(result[i].departureAirport !== req.body.departureAirport)
                    Flag = false
                if(result[i].destinationAirport !== req.body.destinationAirport)
                    Flag = false
                if(req.body.cabin === 'business' && result[i].availableBusiness < req.body.seats)
                    Flag = false
                if(req.body.cabin === 'economy' && result[i].availableEconomy < req.body.seats)
                    Flag = false
                if(Flag === true)
                    flights.push(result[i])
            }
            res.send(flights)
        })
        .catch((err) => {console.log(err)})
})

UserRouter.post('/reserveFlight', (req, res) =>{
    Flight.findById(req.body.departureId)
    .then((flight) => {
        if(req.body.cabin === 'business'){
            flight.availableBusiness -= req.body.seats
        }
        else{
            flight.availableEconomy -= req.body.seats
        }
        flight.save().then(() => {})
        .catch(er => console.log(er))
        User.find({"username" :req.body.username})
        .then((user) => {
            user[0].flights.push(flight)
            user[0].save().then(()=>{})
            .catch(er => console.log(er))
        })
    })
    Flight.findById(req.body.returnId)
    .then((flight) => {
        if(req.body.cabin === 'business'){
            flight.availableBusiness -= req.body.seats
        }
        else{
            flight.availableEconomy -= req.body.seats
        }
        flight.save().then(() =>  {})
        .catch(er => console.log(er))
        User.find({"username" :req.body.username})
        .then((user) => {
            user[0].flights.push(flight)
            user[0].save().then(() => res.json({success: true}))
            .catch(er => res.status(404).json({success: false}))
        })
    })
})


module.exports = UserRouter;