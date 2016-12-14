const mysql = require('mysql');

const database = mysql.createConnection({
	host: 'localhost',
	user: 'jorge',
	password: 'jorg3',
	database: 'chat'
})

database.connect((err) => {
	if (err) {
	  console.error('error connecting: ' + err.stack);
	}
});

module.exports = {
	database
}