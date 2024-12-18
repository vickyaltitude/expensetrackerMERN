const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.encryptUserId = (id,email,name) =>{
  return jwt.sign({userId: id,userEmail: email,userName:name},process.env.JWT_TOKEN_SECRET)
}