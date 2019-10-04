var express = require('express');

var app = express();

app.get('/', (req, res) => {
    res.status(500).json({
        response: 'hello user'
    }) 
})

module.exports = app;