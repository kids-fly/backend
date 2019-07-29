const User = require('./userModel')
const statusHandler = require('../helpers/statusHandler')

const getProfile = async(req, res) => {
    const {id} = req.params
try{
    const data = await User.getUsers(id)
    if(!data) {
    return statusHandler(res ,404 , "User does not exist")
    }
    return statusHandler(res, 200, data)
}catch(err){
return statusHandler(res , 500, 'Something Went Wrong')
}
}
const editUserProfile = async(req,res) => {
    const {username, firstname , lastname ,contact ,imageUrl} = req.body
    const{id}= req.params

try{    
 const dbData = await User.getUsers(id)
 data  = await User.updateUser(id , {
     username: username || dbData.username ,
    password:dbData.password,
     firstname:firstname || dbData.firstname,
     lastname:lastname || dbData.lastname,
     contact:contact || dbData.contact ,
     imageUrl:imageUrl || dbData.imageUrl,
     isAdmin:dbData.isAdmin,
 })
 return statusHandler(res ,200 ,data)

}catch(err){
    return statusHandler(res , 500 , err.toString())

}
}
module.exports={
    getProfile,
    editUserProfile
}