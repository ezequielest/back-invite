var express = require('express');
var mysql = require('mysql');

var app = express();

//import routes
var guestRoutes = require ('./routes/guest');
var userRoutes = require ('./routes/user');
var appRoutes = require ('./routes/app');
var giftRoutes = require ('./routes/gift');

//DB conexion
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "invite",
    port: "3306"
})

con.connect((err) => {
    if (err) throw err;
})

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use('/guest', guestRoutes);
//app.use('/user', userRoutes);
app.use('/gift', giftRoutes);
app.use('/', appRoutes);

var port = 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})
