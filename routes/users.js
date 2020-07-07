const express = require('express');
const userControler = require('../controllers/userController');

const router = express.Router();

router.post('/', userControler.createUser);

module.exports = router;