'use strict'
/*
Auth Controller
Author: Jorge Suarez
Created: 11/29/2016
*/


//dependencies
const bcrypt = require('bcrypt');
const db = require('../config/mysql').database;
const Room = require('../models/room');

//bcrypt salt #
const saltRounds = 10;

// creates a new chat room with name and password
const createRoom = (req, res, next) => {

	if(!req.body.room_name || !req.body.password || !req.body.username) {
		return res.status(400).json({ err: 'missing name or password'});
	}

	//generate salt
	bcrypt.genSalt(saltRounds, (err, salt) => {

		if(err) return res.status(500).json({ err: 'password salt error'});

		//generate hash
		bcrypt.hash(req.body.password, salt, (err, hash) => {

			if(err) return res.status(500).json({err: 'password hash error'});

			let room = new Room({name: req.body.room_name, password: hash });

			room
				.save()
				.then((createdRoom) => {
					createdRoom.username = req.body.username;
					return res.status(201).json(createdRoom);
				})
				.catch((err) => {
					console.log('err', err);
					return res.status(400).send(err);
				});
		});
	});
};

//authenticates a name and password match 
const authenticateRoom = (req, res, next) => {

	if(!req.body.room_name || !req.body.password || !req.body.username) {
		return res.status(400).json({ err: 'missing name or password'});
	}

	let attemptRoom = new Room({name: req.body.room_name});

	attemptRoom.getByName()
		.then((publicRoom) => {
			bcrypt.compare(req.body.password, attemptRoom.password, (err, authenticated) => {
				
				if(authenticated) {
					publicRoom.username = req.body.username;
					return res.status(200).json(publicRoom);
				} else {
					return res.status(401).json({ err: 'authentication failed'});
				}
			});	
		})
		.catch((err) => {
			//if room not found by name return a 404
			if(err == 404) return res.status(404).send();

			// for everything else return an error
			return res.status(400).json(err);
		});
};

module.exports = {
	createRoom,
	authenticateRoom
}