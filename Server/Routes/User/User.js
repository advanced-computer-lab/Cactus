//___________Middleware___________
const express = require('express')
const UserRouter = express.Router()
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

//___________Schema___________
const User = require('../../Schemas/Users')
const Flight = require('../../Schemas/Flight')
const Reservation = require('../../Schemas/Reservation')

//___________Flight Router___________
UserRouter.use(express.json())

//////USER DATA (HIMSELF)/////

UserRouter.get('/getallusers', (req, res) => {
    User.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
});

UserRouter.put('/updateUser', (req, res) => {
    User.findByIdAndUpdate(req.body._id, {
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'email': req.body.email,
        'password': req.body.password,
        'passportNumber': req.body.passportNumber,
        'telephones': req.body.telephones,
        'homeAddress': {
            'country': req.body.country,
            'city': req.body.city
        },
        'countryCode': req.body.countryCode,
        'reservations': req.body.reservations
    })
        .then((result) => {
            res.send({ success: true })
        })
        .catch((err) => {
            console.log(err)
        })
});

UserRouter.delete('/deleteuser', (req, res) => {
    User.findByIdAndRemove(req.body._id)
        .then((result) => {
            res.send({ sucess: true })
        })
        .catch((err) => {
            console.log(err)
        })
});

UserRouter.post('/addUser', (req, res) => {
    const newuser = new User({
        'firstname': req.body.firstname,
        'lastname': req.body.lastname,
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password,
        'isAdmin': false,
        'passportNumber': req.body.passportNumber,
        'telephones': req.body.telephones,
        'homeAddress': req.body.homeAddress,
        'countryCode': req.body.countryCode,
        'reservations': []
    })
    newuser.save()
        .then((result) => {
            res.send({ success: true })
        })
        .catch((err) => {
            console.log(err)
        })
});


///USER FLIGHTS////

UserRouter.post('/getFlights', (req, res) => {
    var flights = []
    Flight.find()
        .then((result) => {
            for (var i = 0; i < result.length; i++) {
                var Flag = true
                if (result[i].departureDate !== req.body.departureDate)
                    Flag = false
                if (result[i].departureAirport !== req.body.departureAirport)
                    Flag = false
                if (result[i].destinationAirport !== req.body.destinationAirport)
                    Flag = false
                if (req.body.cabin === 'business' && result[i].availableBusiness < req.body.seats)
                    Flag = false
                if (req.body.cabin === 'economy' && result[i].availableEconomy < req.body.seats)
                    Flag = false
                if (Flag === true)
                    flights.push(result[i])
            }
            res.send(flights)
        })
        .catch((err) => { console.log(err) })
})

UserRouter.post('/reserveFlight', (req, res) => {

    const reserve = new Reservation()
    var departureId = ""
    var returningId = ""
    var departurePrice = 0
    var returnPrice = 0
    var destination = ""
    var returnloc = ""
    var departureDate = ""
    var returnDate = ""
    var departureTime = ""
    var returnTime = ""
    console.log(req.body.depSeats)
    console.log(req.body.retSeats)
    console.log(req.body.depFlightMap)
    console.log(req.body.retFlightMap)
    Flight.findById(req.body.departureId)
        .then((flight) => {
            if (req.body.cabin === 'business') {
                flight.availableBusiness -= req.body.seats
                flight.businessMap = req.body.depFlightMap
                departurePrice = flight.businessPrice
            }
            else {
                flight.availableEconomy -= req.body.seats
                flight.economyMap = req.body.depFlightMap
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
            if (req.body.cabin === 'business') {
                flight2.availableBusiness -= req.body.seats
                flight2.businessMap = req.body.retFlightMap
                returnPrice = flight2.businessPrice
            }
            else {
                flight2.availableEconomy -= req.body.seats
                flight2.economyMap = req.body.retFlightMap
                returnPrice = flight2.economyPrice
            }
            flight2.save().then(() => {
                destination = flight2.destinationAirport
                returnloc = flight2.departureAirport
                returnDate = flight2.departureDate
                returnTime = flight2.departureTime
                returningId = flight2._id

                User.find({ "username": req.body.username })
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
                        reserve.cabin = req.body.cabin
                        reserve.depSeatNumbers = req.body.depSeats
                        reserve.retSeatNumbers = req.body.retSeats
                        users[0].reservations.push(reserve)
                        reserve.save()
                        users[0].save().then(() => res.send(reserve))
                            .catch(er => console.log(er))
                    })
            })
                .catch(er => console.log(er))
        })

})


const editFlightMap = (map, arr) => {
    for (i = 0; i < arr.length; i++) {
        for (j = 0; j < map.length; j++) {
            if (map[j].number === arr[i]) {
                map[j].reserved = false
                break
            }
        }
    }
}
const editFlightMap2 = (map, newarr, oldarr) => {
    for (i = 0; i < oldarr.length; i++) {
        for (j = 0; j < map.length; j++) {
            if (map[j].number === oldarr[i]) {
                map[j].reserved = false
                break
            }
        }
    }
    for (i = 0; i < newarr.length; i++) {
        for (j = 0; j < map.length; j++) {
            if (map[j].number === newarr[i]) {
                map[j].reserved = true
                break
            }
        }
    }
}
UserRouter.post('/cancelReservation', (req, res) => {
    Reservation.findById(req.body.reservationId)
        .then((reserve) => {
            User.find({ "username": req.body.username })
                .then((users) => {
                    for (i = 0; i < users[0].reservations.length; i++) {
                        if (reserve._id.equals(users[0].reservations[i]._id)) {
                            users[0].reservations.splice(i, 1)
                        }
                    }
                    reserve.remove()
                    //Mail Cancelation
                    //////////////////////////
                    console.log("Sending Mail Here");
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'Cactusairlinesguc@gmail.com',
                            pass: 'w0BNWlUcVIqx'
                        }
                    });

                    var mailOptions = {
                        from: 'Cactusairlinesguc@gmail.com',
                        to: req.body.email,//Insert User Email Here
                        subject: 'Cancellation Email',
                        text: 'Dear Sir/Madam : Your Booking had been Canceled Successfully and your balance had been Updated with ' + req.body.amountrefunded + '.Have a Nice Day !'

                    };

                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });

                    ///
                    users[0].save().then(() => {
                        Flight.findById(reserve.departureId)
                            .then((flight) => {
                                if (reserve.cabin === 'business') {
                                    flight.availableBusiness += reserve.seats
                                    editFlightMap(flight.businessMap, reserve.depSeatNumbers)
                                }
                                else {
                                    flight.availableEconomy += reserve.seats
                                    editFlightMap(flight.economyMap, reserve.depSeatNumbers)
                                }
                                flight.save().then(() => {
                                    Flight.findById(reserve.returnId)
                                        .then((flight2) => {
                                            if (reserve.cabin === 'business') {
                                                flight2.availableBusiness += reserve.seats
                                                editFlightMap(flight2.businessMap, reserve.retSeatNumbers)
                                            }
                                            else {
                                                flight2.availableEconomy += reserve.seats
                                                editFlightMap(flight2.economyMap, reserve.retSeatNumbers)
                                            }
                                            flight2.save().then(() => { res.send({ success: true }) })
                                        })
                                })
                            })
                    })
                })
        })
})

UserRouter.post('/updateReservation', (req, res) => {
    Reservation.findById(req.body.reservationId)
    .then((reserve) =>{
        reserve.depSeatNumbers = req.body.depSeats
        reserve.retSeatNumbers = req.body.retSeats
        reserve.save()
        User.find({"username":req.body.username})
        .then((users) => {
                for(i=0;i<users[0].reservations.length;i++){
                    if(reserve._id.equals(users[0].reservations[i]._id)){ 
                        users[0].reservations.splice(i,1,reserve)
                    }
                }
                users[0].save().then(()=> {
                    Flight.findById(reserve.departureId)
                    .then((flight) => {
                        if(reserve.cabin === 'business'){
                            flight.availableBusiness += reserve.seats
                            flight.businessMap = req.body.depFlightMap
                        }
                        else{
                            flight.availableEconomy += reserve.seats
                            flight.economyMap = req.body.depFlightMap
                        }
                        flight.save().then(() => {
                        Flight.findById(reserve.returnId)
                        .then((flight2) => {
                        if(reserve.cabin === 'business'){
                            flight2.availableBusiness += reserve.seats
                            flight2.businessMap = req.body.retFlightMap
                        }
                        else{
                            flight2.availableEconomy += reserve.seats
                            flight2.economyMap = req.body.retFlightMap
                            }
                        flight2.save().then(() =>  {res.send({success:true})})
                        }) })
                   })
                })
            })
            })
})

UserRouter.post('/getAllReservations', async (req, res) => {
    try{
        const user = await User.find({ "username": req.body.username })
        var array = []
        const reserves = user[0].reservations
        for (var i = -0; i < reserves.length; i++) {
            var dep = new Flight()
            var ret = new Flight()
            var single = {}
            single.reservation = reserves[i]
            const current = reserves[i]
            try{
                dep = await Flight.findById(current.departureId)
            }
            catch(e){
                console.log(e)
            }
            try{
                ret = await Flight.findById(current.returnId)  
                }
            catch(e){
                console.log(e)
            }
                
            single.departureFlight = await dep
            single.returnFlight = await ret
            array.push(single);
        }
        res.send(array)
    }
    catch(e){console.log(e)}
        })

module.exports = UserRouter;