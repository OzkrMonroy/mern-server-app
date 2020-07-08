const User = require('../models/User')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(400).json({errors: errors.array()})
  }

  const { userEmail, userPassword } = req.body

  try {
    let user = await User.findOne({ userEmail });

    if(!user){
      return res.status(400).send({ msg: 'The user doesn\'t exist' });
    }

    const correctPassword = await bcryptjs.compare(userPassword, user.userPassword);
    if(!correctPassword){
      return res.status(400).send({ msg: 'Password is incorrect'});
    }

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
    
  }
}