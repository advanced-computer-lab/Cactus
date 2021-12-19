//___________Middleware___________
const express = require('express')
const AuthRouter = express.Router()
AuthRouter.use(express.json())
require("dotenv").config()
const crypto=require('crypto')
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_TEST);

//___________Schema___________
const User = require('../Schemas/Users')

//Login
AuthRouter.post("/Login", async (req, res) => {
    var user = {
        "username": req.body.username
    }
    User.findOne(user).exec()
        .then((result) => {
            const decipher = crypto.createDecipher('aes192','a password');

            var encrypted = result.password;//Write Here Encrypted password to be Decrypted

            var decrypted = decipher.update(encrypted,'hex','utf8');
            decrypted = decrypted + decipher.final('utf8');
            console.log(decrypted)
            if(decrypted === req.body.password)
                res.send(result)
            else
                res.send(null)
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
            res.send(null)
        })
})
// Register
AuthRouter.post("/Register", (req, res) => {
    //Encryption Code
    const cipher = crypto.createCipher('aes192','a password');
    var encrypted = cipher.update(req.body.password+"",'utf8','hex');//Password to be Encrypted
    encrypted = encrypted + cipher.final('hex');
    console.log(encrypted);
    const newUser = new User({
        title: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        username: req.body.username,
        email: req.body.email,
        password: encrypted,
        passportNumber: req.body.passportNumber,
        gender: req.body.gender,
        telephones: req.body.phoneNumber,
        countryCode: req.body.countryCode,
        homeAddress: req.body.homeAddress,
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
AuthRouter.post('/changePassword', (req,res) => {
    User.findById(req.body.id)
    .then((user) => {
        const cipher = crypto.createCipher('aes192','a password');
        var encrypted = cipher.update(req.body.password+"",'utf8','hex');//Password to be Encrypted
        encrypted = encrypted + cipher.final('hex');
        user.password = encrypted
        user.save()
        .then(()=>res.send("good"))
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
AuthRouter.post('/create-payment-intent', async (req, res) => {
    const {paymentMethodType, currency} = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 10000,
            currency: currency,
            description: 'Cactus Airlines',
            payment_method_types:[paymentMethodType],
        });
        res.json({
            clientSecret: paymentIntent.client_secret,
            success: true,
            message: "Payment successful"
        });
    } catch (error) {
        res.status(400).json({error: {message: error.message}});
        res.json({
            message: "Payment Failed",
            success: false
        })
    }
});


module.exports = AuthRouter