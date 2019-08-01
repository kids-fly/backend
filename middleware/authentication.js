
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const statusHandler = require('../helpers/statusHandler')
const Users = require('../users/userModel')
dotenv.config()
const authenticate =async(req, res, next)=> {
  try{
    const token = req.headers.Authorization
    if(!token){
      return statusHandler(res,401,"You need to login ")
    }
      const decrypt = await jwt.verify(token, process.env.JWT_SECRET)
      const rows = await Users.getUsers(decrypt.subject)
    
      if(!rows){
        return statusHandler(res ,403,'Token not accessible')
      }
      req.user = {
        id: decrypt.subject,
        username: decrypt.username,
        isAdmin:rows.isAdmin
      };
         return next(); 
  }catch(err){
    return statusHandler(res, 500 , "Something went wrong")

  }
}
const isAdmin = async(req, res ,next) =>{
  if(req.user.isAdmin){
    return next()
  }
  return res.status(401).json({message:'Not authorized'})
}

module.exports = {
  authenticate, isAdmin
};

