//Middlewares
const express = require('express')
const mongoose = require('mongoose')
//Schemas
const Flight = require('./Schemas/Flight')

//Routers
const addFlightRoute = require('./Routes/addFlight')
//App
const app = express()
mongoose.connect('mongodb+srv://sampleUser:testpassword1001@flightdb.gqpep.mongodb.net/FlightDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>{
        console.log("MongoDB is now connected")
        
    })
    .catch(err => console.log(err));

app.listen(3000,()=> {
    console.log(`listening on port https://localhost:3000/`)
})

app.get('/',(req,res)=>{
    res.send('<h1>Hello</h1>')
})
app.route('/',addFlightRoute)