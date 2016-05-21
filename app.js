require('./environment.js');
var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');

var options = {
    key: fs.readFileSync('./access/file.pem'),
    cert: fs.readFileSync('./access/cert.pem')
};

//** App Logic**
var debug = true;
var serverport = 443;

console.log("ProfessorDex starting up.");

var server = https.createServer(options, app);

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

server.listen(serverport, function(){
    console.log("ProfessorDex listening on port: " + serverport);
});