'use strict'
/*
Auth Controller
Author: Jorge Suarez
Created: 11/29/2016
*/


//dependencies
const bcrypt = require('bcrypt');
const db = require('../config/mysql').database;
const authQueries = require('../sql/queries/auth');


//bcrypt salt #
const saltRounds = 10;

// creates a new chat room with name and password
const newRoom = (req, res, next) => {

	if(!req.body.name || !req.body.password) {
		return res.status(400).json({ error: 'missing name or password'});
	}

	//generate salt
	bcrypt.genSalt(saltRounds, (err, salt) => {

		if(err) return res.status(500).json({ error: 'password salt error'});

		//generate hash
		bcrypt.hash(req.body.password, salt, (err, hash) => {

			if(err) return res.status(500).json({error: 'password hash error'});

			//save name and hashed password to SQL
			db.query(authQueries.insertRoom(req.body.name, hash), (err, result) => {

				if(err) return res.status(400).json(err);

				//no errors means room created
				return res.status(201).send();
			});
		});
	});
};

//authenticates a name and password match 
const authenticate = (req, res, next) => {

	if(!req.body.name || !req.body.password) {
		return res.status(400).json({ error: 'missing name or password'});
	}

	db.query(authQueries.getRoomByName(req.body.name), (err, result) => {

		if(err) return res.status(500).json({error: err});

		//room doesn't exist with that name -- not found 
		if(!result.length) return res.status(404).send();
		
		let room = result[0];

		bcrypt.compare(req.body.password, room.password, (err, authenticated) => {
			
			if(authenticated) {
				return res.status(200).json({ authenticated: authenticated });
			} else {
				return res.status(401).json({ error: 'authentication failed' });
			}
		});	
	});
};

module.exports = {
	newRoom,
	authenticate
}