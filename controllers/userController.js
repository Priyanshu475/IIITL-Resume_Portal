const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const {SECRET} =require('../config/keys')



const createToken = (_id) => {
  return jwt.sign({_id},SECRET, { expiresIn: '3d' })
}


// login a user
const loginUser = async (req, res) => {
  const {email, password,role} = req.body

  try {
    let user;
    if (role == 'admin') {
       user = await User.login(email, password,role);
    } else if (role == 'user') {
       user = await User.login(email, password,role);
    } else {
      throw new Error('Invalid role');
    }
    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token,role})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {email, password,role} = req.body

  try {
    const user = await User.signup(email, password,role)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token,role})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }