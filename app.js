require('./environment.js');
var express = require('express');
var app = express();

console.log("ProfessorDex starting up.");

app.get('/webhook', function (req, res) {
  if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong validation token');    
  }
});

console.log("ProfessorDex listening...");
app.listen(80); //Change to 80?