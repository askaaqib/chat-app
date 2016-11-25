const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chats');


router.get('/', chatController.connect);

module.exports = router;