//Middlewares
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();
//Schemas
const Flight = require('./Schemas/Flight')

//Routers
const addFlightRoute = require('./Routes/addFlight')

//App
const app = express()
const mongoURI = process.env.MONGOURI
const PORT = process.env.PORT

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port https://localhost:${PORT}/`)
        })
        console.log("MongoDB is now connected")

    })
    .catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('<h1>Hello</h1>')
})

app.use('/addflight', addFlightRoute)