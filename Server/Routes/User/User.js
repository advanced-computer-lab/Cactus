//___________Middleware___________
const express = require('express')
const UserRouter = express.Router()
const mongoose = require('mongoose')

//___________Schema___________
const User = require('../../Schemas/Users')
const Flight = require('../../Schemas/Flight')
const Reservation = require('../../Schemas/Reservation')

//___________Flight Router___________
UserRouter.use(express.json())


UserRouter.post('/addUser', (req,res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
        reservations: []
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

UserRouter.post('/reserveFlight', (req, res) => {
    const reserve = new Reservation()
    var departurePrice =0
    var returnPrice = 0
    var destination = ""
    var returnloc = ""
    var departureDate = ""
    var returnDate = ""
    Flight.findById(req.body.departureId)
    .then((flight) => {
        flight.save().then(() => {
            departureDate = flight.departureDate
            if(req.body.cabin === 'business'){
                flight.availableBusiness -= req.body.seats
                departurePrice = flight.businessPrice
            }
            else{
                flight.availableEconomy -= req.body.seats
                departurePrice = flight.economyPrice
            }
        })
        .catch(er => console.log(er))
        })
    Flight.findById(req.body.returnId)
    .then((flight2) => {
        flight2.save().then(() =>  {
            destination = flight2.destinationAirport
            returnloc = flight2.departureAirport
            returnDate = flight2.departureDate
            console.log(destination)
        if(req.body.cabin === 'business'){
            flight2.availableBusiness -= req.body.seats
            returnPrice = flight2.businessPrice
        }
        else{
            flight2.availableEconomy -= req.body.seats
            returnPrice = flight2.economyPrice
        }

        User.find({"username":req.body.username})
    .then((users) => {
            reserve.destination = destination
            reserve.return = returnloc
            reserve.departureDate = departureDate
            reserve.returnDate = returnDate
            reserve.departurePrice = departurePrice
            reserve.returnPrice = returnPrice
            reserve.seats = req.body.seats
            reserve.cabin =  req.body.cabin 
        users[0].reservations.push(reserve)
        users[0].save().then(()=> res.send(reserve))
        .catch(er => console.log(er))
    })
        })
        .catch(er => console.log(er))})
    
    })
   


module.exports = UserRouter;