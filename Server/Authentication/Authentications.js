//___________Middleware___________
const express = require('express')
const AuthRouter = express.Router()
const mongoose = require('mongoose')
AuthRouter.use(express.json())

//___________Schema___________
const User = require('../Schemas/Users')

//Login
AuthRouter.post("/Login",async (req,res)=>{
    var user = {
        "username": req.body.username,
        "password": req.body.password
    }
    User.findOne(user).exec()
        .then((result)=>{
        res.send(result)
        console.log(result)
        })
        .catch((err)=>{
        console.log(err)
        })
})
AuthRouter.get('/users',(req,res)=>{
    User.find()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err)
        })
})


module.exports = AuthRouter