const express = require('express');
const app = express(); //extence of the express
//it has all the fuctionality by that we can make a server
//we can change the app as anything but per the industry related we should name as app

const passport = require('./auth')

const db = require('./db');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser')
app.use(bodyParser.json()); //store all the objects in req.body

//Middleware Function
const LogRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); //Move on to the next phase
}
app.use(LogRequest); //apply middleware to all routes

app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local', { session: false });

app.get('/', function (req, res) {
    res.send('Welcome to backend.. Hello Subham ')
})

//Import the  route files
const personRoutes = require('./routes/PersonRoutes');
const menuRoutes = require('./routes/menuRoutes');

//use the Routes
app.use('/person', personRoutes)
app.use('/menu', localAuthMiddleware, menuRoutes)




app.listen(PORT, () => {
    console.log("server is listening on port 3000")
})