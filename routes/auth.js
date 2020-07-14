const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// api/auth
router.post('/', 
  [
    check('userEmail', 'Ingresa un email válido').isEmail(),
    check('userPassword', 'La contraseña debe de tener al menos seis caracteres').isLength({ min: 6 })
  ],
  authController.authenticateUser  
);

router.get('/',
  auth,
  authController.getUserAuthenticate
)

module.exports = router;