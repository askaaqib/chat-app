const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat');
const authController = require('../controllers/auth');

//creates a new private room, stores name and bcrypt password in SQL
router.post('/room', authController.createRoom);

//checks for existing room and password 
router.post('/authenticate', authController.authenticateRoom);

module.exports = router;