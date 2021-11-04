//___________Middleware___________
const express = require('express')
const AuthRouter = express.Router()
const mongoose = require('mongoose')
AuthRouter.use(express.json())

//___________Schema___________
const User = require('../Schemas/Users')

//Login
AuthRouter.post("/Login",async (req,res)=>{
    var user =new User();
    if(req.body.flightNumber){
        var field = "username"
        user[field]=req.body.username
    }
    if(req.body.departureTime){
        field = "password"
        user[field]=req.body.password
    }
    User.find(user)
        .then((result)=>{
        res.send(result)
        console.log(result)
        })
        .catch((err)=>{
        console.log(err)
        })

})

module.exports = AuthRouter