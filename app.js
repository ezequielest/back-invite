var express = require('express');
var mongoose = require('mongoose');

var app = express();

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    next();
});

//import routes
var giftListRoutes = require ('./routes/gift-list');
var guestRoutes = require ('./routes/guest');
var userRoutes = require ('./routes/user');
var appRoutes = require ('./routes/app');
var giftRoutes = require ('./routes/gift');

//DB conexion
mongoose.connect('mongodb://localhost:27017/invite', {useUnifiedTopology: true, useNewUrlParser: true}, (err,res)=> {
    if (err) throw err;
    console.log('conexion exitosa a la db');
})


// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/gift-list', giftListRoutes);
app.use('/guest', guestRoutes);
//app.use('/user', userRoutes);
app.use('/gift', giftRoutes);
app.use('/', appRoutes);

var port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
