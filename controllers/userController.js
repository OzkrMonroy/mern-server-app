const User = require('../models/User')

exports.createUser = async (req, res) => {
  try {
    let user;

    user = new User(req.body)
    await user.save();

    res.send('Usuario creado correctamente');
    
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }
}