const express = require('express');
const userControler = require('../controllers/userController');
const { check } = require('express-validator');

const router = express.Router();

router.post('/', 
  [
    check('userName', 'El nombre es obligatorio').not().isEmpty(),
    check('userEmail', 'Ingresa un email válido').isEmail(),
    check('userPassword', 'La contraseña debe de tener al menos seis caracteres').isLength({ min: 6 })
  ]
,userControler.createUser);

module.exports = router;