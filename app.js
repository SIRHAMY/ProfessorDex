require('./environment.js');
var express = require('express');
var app = express();

var debug = true;

console.log("ProfessorDex starting up.");

app.get('/webhook', function (req, res) {
    
    if(debug) console.log("Received webhook call");
    
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
        if(debug) console.log("Caller verified");
    } else {
        res.send('Error, wrong validation token');   
        if(debug) console.log("Caller verification failed"); 
    }
});

console.log("ProfessorDex listening...");
app.listen(80); //Change to 80?