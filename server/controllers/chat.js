/*
Chat Controller
Author: Jorge Suarez
Created: 11/17/2016
*/

const io = require("socket.io")();

const success = { status: "200" };
const unauthorized = { status: "401" };

io.sockets.on("connection", (socket)=> {
	socket.join(1);
	// add user
	socket.room = 1;
	socket.on("message", (messageData) => {
		console.log('message', messageData);

		io.sockets.in(socket.room).emit("message", messageData);
	});

});

module.exports = io;