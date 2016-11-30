/*
Room Model
Author: Jorge Suarez
Created: 11/29/2016
*/

'use strict'
/*
+------------+--------------+------+-----+-------------------+-----------------------------+
| Field      | Type         | Null | Key | Default           | Extra                       |
+------------+--------------+------+-----+-------------------+-----------------------------+
| room_id    | int(11)      | NO   | PRI | NULL              | auto_increment              |
| name       | varchar(255) | NO   | UNI | NULL              |                             |
| password   | varchar(255) | NO   |     | NULL              |                             |
| updated_at | datetime     | YES  |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| created_at | datetime     | YES  |     | CURRENT_TIMESTAMP |                             |
+------------+--------------+------+-----+-------------------+-----------------------------+
*/
const authQueries = require('../sql/queries/auth');

module.exports = class Room {
	constructor(roomData) {
		this.room_id = roomData.room_id || null,
		this.name = roomData.room_id || null, 
		this.password = roomData.password || null,
		this.updated_at = roomData.updated_at || null, 
		this.created_at = roomData.created_at || null

		this.propertyInfo = {
			room_id: {isUpdatable: false, isPublic: true},
			name: {isUpdatable: true, isPublic: true}, 
			password: {isUpdatable: true, isPublic: false},
			updated_at: {isUpdatable: false, isPublic: true},
			created_at: {isUpdatable: false, isPublic: true}
		}
	}

	/**
   * create {function}
   * creates a new room
   * @public
   * @return {Object}
   */
	create() {

	}

	/**
   * getByName {function}
   * gets and sets this room by room name
   * @public
   * @return {Object}
   */
	getByName() {

	}

	/**
   * getById {function}
   * gets and sets this room by id 
   * @public
   * @return {Object}
   */
  getById(id) {

  };

  /**
   * _toObject {function}
   * Return self in JS object form
   * @private
   * @return {Object}
   */
  _toObject() {
    let self = {};

    Object.keys(this).forEach((property) => {
			if(this.propertyInfo[property] && this.propertyInfo[property].isPublic) {
				self[property] = this[property];
			}
    });

    return self;
  };

	/**
   * _toCreationObject {function}
   * Return self in JS object form for sequalize creation
   * @private
   * @return {Object}
   */
	_toCreationObject() {
		let self = {};

    Object.keys(this).forEach((property) => {
			if(this.propertyInfo[property] && this.propertyInfo[property].isUpdatable) {
				self[property] = this[property];
			}
    });

    return self;
	};

	/**
   * _set {function}
   * @private
   * @return {Void}
   */
	_set(jobData) {
		Object.keys(jobData).forEach((property) => {
			this[property] = jobData[property];
		});
	};
}