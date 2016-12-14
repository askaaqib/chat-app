'use strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')();

//body parser config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//CORS
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }

});

//http routes
app.use('/chat', require('./routes/chat'));

const PORT = 8080;

httpServer.listen(PORT, () => {
  console.log(`Chat: Running on port ${PORT}`);
});

//web socket connection
require('./controllers/chat').listen(httpServer);

module.exports = app;