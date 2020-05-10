var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var app = express();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

//import routes
//var giftListRoutes = require ('./routes/gift-list');
var guestRoutes = require ('./routes/guest');
var userRoutes = require ('./routes/user');
var appRoutes = require ('./routes/app');
var giftRoutes = require ('./routes/gift');

//DB conexion
mongoose.connect('mongodb://localhost:27017/invite', {useUnifiedTopology: true, useNewUrlParser: true}, (err,res)=> {
    if (err) throw err;
    console.log('conexion exitosa a la db');
})


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

//Routes
//app.use('/gift-list', giftListRoutes);
app.use('/api/guest', guestRoutes);
app.use('/api/user', userRoutes);
app.use('/api/gift', giftRoutes);
app.use('/api/', appRoutes);

var port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
