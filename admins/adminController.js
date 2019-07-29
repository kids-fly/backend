const Admin = require("./adminModel");
const statusHandler = require("../helpers/statusHandler");
const User = require("../users/userModel");
const makeRemoveAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await User.getUsers(id);
    const newData = await User.updateUser(id, {
      isAdmin: !data.isAdmin
    });
    if (!newData.isAdmin) {
      await Admin.deleteAdminDetails(newData.id);
    }
    return statusHandler(res, 201, newData);
  } catch (err) {
    return statusHandler(res, 500, "Something went wrong");
  }
};
const addAdminDetails = async (req, res) => {
  const { userId } = req.params;
  const { airport_id, admin_location } = req.body;
  const data = await User.getUsers(userId);
 
  try {
    const newData = await Admin.postAdminDetials({
      user_id: data.id,
      airport_id,
      admin_location
    });
    return statusHandler(res, 201, newData);
  } catch (err) {
    return statusHandler(res, 500, "Something went wrong");
  }
};
const addAirport = async(req , res) => {
    
    try{ 
        const {airport_name, airport_location} = req.body
        const data = await Admin.postAirport({airport_name, airport_location})
        return statusHandler(res, 201 , data)
    }catch(err){
        return statusHandler(res, 500 ,"Something went wrong")
    }
}
const addFlight = async(req ,res) =>{
    const {
        departure_airport_id,
        departure_time,
        arrival_airport_id,
        arrival_time,
        airline_name
    } = req.body
    try{
        const data = await Admin.postFlight({
        departure_airport_id,
        departure_time,
        arrival_airport_id,
        arrival_time,
        airline_name
        })
        return statusHandler(res , 201 , data)
    }catch(err){
        return statusHandler(res, 500, err.toString());
    }
}

module.exports = {
  makeRemoveAdmin, 
  addAdminDetails,
  addFlight,
  addAirport,
};
