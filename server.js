const express = require('express');
const app = express(); //extence of the express
//it has all the fuctionality by that we can make a server
//we can change the app as anything but per the industry related we should name as app

const db = require('./db');





const bodyParser = require('body-parser')
const { error } = require('console')
app.use(bodyParser.json()); //store all the objects in req.body

//Import the person route file
const personRoutes = require('./routes/PersonRoutes');
//use the personRoutes
app.use('/person', personRoutes)


//Import the menu route file
const menuRoutes = require('./routes/menuRoutes');
//use the menuRoutes
app.use('/menu', menuRoutes)



app.get('/', function (req, res) {
    res.send('Welcome to backend.. Hello Subham ')
})

app.get('/pakhala', (req, res) => {
    var pakhala_dish = {
        "pakhala": "250gm",
        "alubharta": "10gm",
        "price": 50,
        "isfull": true

    }
    res.send(pakhala_dish)
})

app.post('/items', (req, res) => {
    res.send('data is saved')
})

app.get('/greet', (req, res) => {
    res.send("Thanks for your greet")
})

app.listen(3000, () => {
    console.log("server is listening on port 3000")
})