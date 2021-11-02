//Middlewares
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();
//Schemas
const Flight = require('./Schemas/Flight')

//Routers
const addFlightRoute = require('./Routes/addFlight')
const findFlightRoute = require('./Routes/findFlight')
const deleteFlightRoute = require('./Routes/deleteFlight')

//App
const app = express()
app.use(cors())
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

app.use('/addFlight', addFlightRoute)

app.use('/findFlight', findFlightRoute)

app.use('/deleteFlight', deleteFlightRoute)