# chat-app

React-Redux Client
Node.js Express Server
Socket.io

Hello! I created this application to learn about websockets. 
I also wanted to develop and deploy a decoupled architecture from scratch.
* The production client is running on AWS S3: http://jor-chata.s3-website-us-west-1.amazonaws.com/.
* The production server is running on an AWS EC2 instance.

The goal was to have many devices be connected to a socket and send messages to one another. A user can create a room with a password and share the credentials with others. The messages are not stored so they are all lost when the window is reloaded or closed. The room name and password are stored so a user can claim a room and password (hashed and salted with BCrypt) for repeated use. 

##Client

Requirements:
* Gulp (to run `gulp style:watch`)
* Node.js

How to run: 
* Don't forget to `npm install` inside client directory. 
* Run `gulp style:watch` to watch all the files in the `/sass` directory and build. 
* Run `npm run dev` to watch all javascript files in the `/app` directory have webpack build bundle.js. 
* Run `node app.js` or `nodemon` to run client on localhost:3002. 

##Server 

requirements:
* MySQL (v5.6 or higher)
* Node.js (v4.2.3 or higher)

Setup: 
* Don't forget to `npm install` inside server directory.
* Create a local MySQL database and run migrations located in `/sql/migrations/`.
* Modify `/config/mysql.js` to have the correct user, password, and database name for the server to access. 

How to run: 
* Run `node index.js` or `nodemon`. 

##TODO
* navbar
* store messages in NoSQL for every room
* track active users in socket 

