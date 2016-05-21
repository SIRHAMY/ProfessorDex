'use strict';

require('./environment.js');
var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');
var LEX = require('letsencrypt-express');

var lex = LEX.create({
  configDir: require('os').homedir() + '/letsencrypt/etc'
, approveRegistration: function (hostname, cb) { // leave `null` to disable automatic registration
    // Note: this is the place to check your database to get the user associated with this domain
    cb(null, {
      domains: [hostname]
    , email: 'CHANGE_ME' // user@example.com
    , agreeTos: true
    });
  }
});

var options = {
    key: fs.readFileSync('./access/live/professordex.com/privkey.pem'),
    cert: fs.readFileSync('./access/live/professordex.com/cert.pem')
};

//** App Logic**
var debug = true;
var serverport = 443;

console.log("ProfessorDex starting up.");

app.use('/webhook', function (req, res) {
    
    if(debug) console.log("Received webhook call");
    
    if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        res.send(req.query['hub.challenge']);
        if(debug) console.log("Caller verified");
    } else {
        res.send('Error, wrong validation token');   
        if(debug) console.log("Caller verification failed"); 
    }
});

var server = https.createServer(lex.httpsOptions, LEX.createAcmeResponder(lex, app));

server.listen(serverport, function(){
    console.log("ProfessorDex listening on port: " + serverport);
});