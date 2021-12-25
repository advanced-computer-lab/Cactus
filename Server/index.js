//___________Middleware___________
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();


//___________Routers___________
const FlightRouter = require('./Routes/Flight/Flight')
const UserRouter = require('./Routes/User/User')
const AuthenticationRouter = require('./Authentication/Authentications')

//___________App___________
const app = express()
app.use(cors())
// app.use(passport.initialize())



//___________ENV___________
const mongoURI = process.env.MONGOURI
const PORT = process.env.PORT

//___________Connection to MongoDB___________
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listening on port http://localhost:${PORT}/`)
        })
        console.log("MongoDB is now connected")

    })
    .catch(err => console.log(err));



app.get('/', (req, res) => {
    res.send('<h1>Cactus Airlines - Server Homepage</h1>')
})


app.use('/Flight',cors(),FlightRouter);
app.use('/Authentication',cors(),AuthenticationRouter);
app.use('/Users',UserRouter);


