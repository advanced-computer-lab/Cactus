//___________Middleware___________
const express = require('express')
const AuthRouter = express.Router()
const mongoose = require('mongoose')
AuthRouter.use(express.json())
require("dotenv").config()
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

//___________Schema___________
const User = require('../Schemas/Users')

//Login
AuthRouter.post("/Login", async (req, res) => {
    var user = {
        "username": req.body.username,
        "password": req.body.password
    }
    User.findOne(user).exec()
        .then((result) => {
            res.send(result)
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
})
// Register
AuthRouter.post("/Register", (req, res) => {
    const newUser = new User({
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        passportNumber: req.body.passportNumber,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        isAdmin: false,
        reservations: []
    });
    newUser.save()
        .then((response)=>{
            res.send(response)
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
        })
    
})
// Get Users
AuthRouter.get('/users', (req, res) => {
    User.find()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err)
        })
})
AuthRouter.post('/Checkout', async (req, res) => {
    let { amount, id } = req.body
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "EGP",
            description: "Cactus Airlines",
            payment_method: id,
            confirm: true
        })
        console.log("Payment: ", payment)
        res.json({
            message: "Payment Successful",
            success: true
        })
    } catch (error) {
        console.log("Error: ", error)
        res.json({
            message: "Payment Failed",
            success: false
        })
    }
})


module.exports = AuthRouter