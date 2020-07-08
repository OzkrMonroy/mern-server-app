const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  // Validacion de express-validator
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const { userEmail, userPassword } = req.body;

  try {
    let user = await User.findOne({userEmail});

    if(user){
      return res.status(400).json({ msg: 'El usuario ya existe'});
    }

    user = new User(req.body)
    // Hashear password
    const salt = await bcryptjs.genSalt(10);
    user.userPassword = await bcryptjs.hash(userPassword, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, process.env.SECRET_WORD, {
      expiresIn: 3600
    }, (error, token) => {
      if(error) throw error;

      res.json({ token });
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }
}