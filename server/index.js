'use strict';

const express = require('express');
const path = require('path');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')();

// loads env file 
require('dotenv').load();
require('./config/mysql.js');

//CORS
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }

});

// app.use('*', (req, res, next) => {
// 	io.sockets.on('connection', (socket) => {
// 	  console.log('a user connected');
// 	  sockets.push(socket);
// 	});
// });

const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Chat: Running on port ${PORT}`);
});

require('./controllers/chat').listen(httpServer);

module.exports = app;