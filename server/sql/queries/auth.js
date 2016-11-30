
//creates a new password protected chat room 
module.exports.insertRoom = (name, password) => { 
	return `INSERT INTO rooms (name, password) VALUES ('${name}', '${password}');`
};

//gets a room by its unique name
module.exports.getRoomByName = (name) => {
	return `SELECT * FROM rooms WHERE name = '${name}';`
}

//gets a room by its unique room_id
module.exports.getRoomById = (id) => {
	return `SELECT * FROM rooms WHERE room_id = '${id}';`
}