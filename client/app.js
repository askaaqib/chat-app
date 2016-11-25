'use strict';
// THIS SERVER FILE IS ONLY FOR DEVELOPMENT PURPOSES

// set up base express app
const express = require('express');
const app = express();
const path = require('path');

// set 'html' as the engine, using ejs's renderFile function
const ejs = require('ejs');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// serve public folder as static assets on the root route
const publicPath = path.join(__dirname, '/public');
app.use("/", express.static(publicPath));

app.get('*', function(request, response) {
	response.render('index');
});

// SERVER
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 3002;

let server = require('http').createServer(app);
server = server.listen(port);
console.log(process.env.NODE_ENV  + ' server running at port:' + port);