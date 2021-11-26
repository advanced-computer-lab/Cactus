//___________Middleware___________
const express = require('express')
const UserRouter = express.Router()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
require('dotenv').config();

const EMAIL_PASS = process.env.EMAIL_PASS

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
    var departureId = ""
    var returningId = ""
    var departurePrice =0
    var returnPrice = 0
    var destination = ""
    var returnloc = ""
    var departureDate = ""
    var returnDate = ""
    var departureTime = ""
    var returnTime = ""
    Flight.findById(req.body.departureId)
    .then((flight) => {
        if(req.body.cabin === 'business'){
            flight.availableBusiness -= req.body.seats
            departurePrice = flight.businessPrice
        }
        else{
            flight.availableEconomy -= req.body.seats
            departurePrice = flight.economyPrice
        }
        flight.save().then(() => {
            departureId = flight._id
            departureDate = flight.departureDate
            departureTime = flight.departureTime
        })
        .catch(er => console.log(er))
        })
    Flight.findById(req.body.returnId)
    .then((flight2) => {
        if(req.body.cabin === 'business'){
            flight2.availableBusiness -= req.body.seats
            returnPrice = flight2.businessPrice
        }
        else{
            flight2.availableEconomy -= req.body.seats
            returnPrice = flight2.economyPrice
        }
        flight2.save().then(() =>  {
            destination = flight2.destinationAirport
            returnloc = flight2.departureAirport
            returnDate = flight2.departureDate
            returnTime = flight2.departureTime            
            returningId = flight2._id

        User.find({"username":req.body.username})
    .then((users) => {
        reserve.departureId = departureId
        reserve.returnId = returningId
        reserve.destination = destination
        reserve.return = returnloc
        reserve.departureDate = departureDate
        reserve.departureTime = departureTime
        reserve.returnDate = returnDate
        reserve.returnTime = returnTime
        reserve.departurePrice = departurePrice
        reserve.returnPrice = returnPrice
        reserve.seats = req.body.seats
        reserve.cabin =  req.body.cabin 
        users[0].reservations.push(reserve)
        reserve.save()
        users[0].save().then(()=> res.send(reserve))
        .catch(er => console.log(er))
    })
        })
        .catch(er => console.log(er))})
    
    })


    UserRouter.post('/cancelReservation', (req, res) => {
        Reservation.findById(req.body.reservationId)
        .then((reserve) =>{
            User.find({"username":req.body.username})
            .then((users) => {
                    for(i=0;i<users[0].reservations.length;i++){
                        if(reserve._id.equals(users[0].reservations[i]._id)){ 
                            users[0].reservations.splice(i,1)
                        }
                    }
                   reserve.remove()
                //    Sending Mail
                    console.log("Sending Mail Here");
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'Cactusairlinesguc@gmail.com',
                            pass: EMAIL_PASS
                        }
                    })
                    var mailOptions = {
                        from: 'Cactusairlinesguc@gmail.com',
                        to: req.body.email,
                        subject: 'Cancellation Email',
                        text: 'Dear ' +req.body.title +' '+ req.body.firstName+ ' Your booking has been cancelled successfully, you will be refunded EGP ' + req.body.refundedAmount +' We hope that we can have you on board with us soon. Cactus Airlines Team'
                    } 
                    transporter.sendMail(mailOptions, function(error,info){
                        if(error){
                            console.log(error);
                        }else{
                            console.log('Email send: '+info.response)
                        }
                    })
            users[0].save().then(()=> {
                Flight.findById(reserve.departureId)
                .then((flight) => {
                    if(reserve.cabin === 'business'){
                        flight.availableBusiness += reserve.seats
                    }
                    else{
                        flight.availableEconomy += reserve.seats
                    }
                    flight.save().then(() => {
                    Flight.findById(reserve.returnId)
                    .then((flight2) => {
                    if(reserve.cabin === 'business'){
                        flight2.availableBusiness += reserve.seats
                    }
                    else{
                        flight2.availableEconomy += reserve.seats
                        }
                    flight2.save().then(() =>  {res.send({success:true})})
                    }) })
               })
            })
        })
        })
        })

    UserRouter.post('/getAllReservations', (req, res) => {
        User.find({"username":req.body.username})
        .then((user) =>{
            res.send(user[0].reservations)
        })
    })      

module.exports = UserRouter;