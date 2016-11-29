const mysql = require('mysql');

const database = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE
})

database.connect((err) => {
	if (err) {
	  console.error('error connecting: ' + err.stack);
	}
});

module.exports = {
	database
}