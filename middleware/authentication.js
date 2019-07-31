
const  dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const statusHandler = require('../helpers/statusHandler')
const Users = require('../users/userModel')
dotenv.config()
const authenticate =async(req, res, next)=> {
  try{
    if (req.session && req.session.user) {
      const decrypt = await jwt.verify(req.session.user, process.env.JWT_SECRET)
     
      const rows = await Users.getUsers(decrypt.subject)
      if(!rows){
        return statusHandler(res ,403,'Token not accessible')
      }

      req.user = {
        id: decrypt.subject,
        username: decrypt.username,
      };
         return next();
      } 
        return res.status(401).json({ message: 'Not authorized' });
      
  }catch(err){
    return statusHandler(res, 500 , 'Something Went Wrong')

  }
};
module.exports = {
  authenticate
};

