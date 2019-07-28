const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
const crypted = {
    generateToken(user){
        const payload = {
            subject:user.id,
            username:user.username
        }
        const options = {
            expiresIn: '1d', 
          };
          return jwt.sign(payload, process.env.JWT_SECRET, options)
    },
    hashPassword(password) {
      return bcrypt.hashSync(password, 12);
    },
    comparePassword(password, hashPassword) {
      return bcrypt.compareSync(password, hashPassword);
    }
  };
  module.exports = crypted