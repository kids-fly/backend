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
  try {
    const newData = await Admin.postAdminDetials({
      user_id: userId,
      airport_id,
      admin_location
    });
    return statusHandler(res, 201, newData);
  } catch (err) {
    return statusHandler(res, 500, "Something went wrong");
  }
};
const editDetails =async(req ,res) => {
    const {userId} = req.params;
    const {airport_id , admin_location} = req.body;
    try{

        const newData = await Admin.postAdminDetials({
            user_id: userId,
            airport_id,
            admin_location
          });
          return statusHandler(res, 201, newData)
    }catch(err){
        return statusHandler(res ,500 , "Something went wrong")
    }
}
const addFlight = async (req, res) => {
  const {
    departure_airport_id,
    departure_time,
    arrival_airport_id,
    arrival_time,
    airline_name
  } = req.body;
  try {
    const data = await Admin.postFlight({
      departure_airport_id,
      departure_time,
      arrival_airport_id,
      arrival_time,
      airline_name
    });
    return statusHandler(res, 201, data);
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};
const getFlights = async (req, res) => {
  try {
    const data = await Admin.getFlights();
    if (data.length === 0) {
        return statusHandler(res, 200, "No Flights added");
      }
    return statusHandler(res, 200, data);
  } catch (err) {
    return statusHandler(res, 500, err.toString());
  }
};
const getFlight = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Admin.getFlights(id);
    if (!data) {
      return statusHandler(res, 404, "Flight Not Found");
    }
    return statusHandler(res, 200, data);
  } catch (err) {
    return statusHandler(res, 500, "Failed to get flight");
  }
};

const removeFlight = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Admin.getFlights(id);
      if (!data) {
        return statusHandler(res, 404, "Flight not Found");
      }
      await Admin.deleteFlight(data.id);
      return statusHandler(res, 200, "Flight Deleted");
    } catch (err) {
      return statusHandler(res, 500, "Flight could not be deleted");
    }
  };
  const addAirport = async (req, res) => {
    try {
      const { airport_name, airport_location } = req.body;
      const data = await Admin.postAirport({ airport_name, airport_location });
      return statusHandler(res, 201, data);
    } catch (err) {
      return statusHandler(res, 500, "Flight not added");
    }
  };
const getAirport = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await Admin.getAirports(id);
    if (!data) {
      return statusHandler(res, 404, "Airport Not Found");
    }
    return statusHandler(res, 200, data);
  } catch (err) {
    return statusHandler(res, 500, "Failed to get Airport");
  }
};
const removeAirport = async (req, res) => {
    const { id } = req.params;
    try {
      const data = await Admin.getAirports(id);
      if (!data) {
        return statusHandler(res, 404, "Airport not Found");
      }
      await Admin.deleteAirport(data.id);
      return statusHandler(res, 200, "Airport Deleted");
    } catch (err) {
      return statusHandler(res, 500, "Airport could not be deleted");
    }
  };
const getAllAssignedUsers = async(req,res) => {
    const {id} = req.params;
    try{
        const data = await Admin.getAllusers(id);
        if(data.length === 0){
            return status(res, 200 ,"No Assigned Client" )
        }
        return statusHandler(res ,200 ,data)
    }
    catch(err){
        return statusHandler(res ,500 ,err.toString())
    }
}
module.exports = {
  makeRemoveAdmin,
  addAdminDetails,
  addFlight,
  addAirport,
  removeFlight,
  getFlights,
  getFlight,
  getAirport,
  removeAirport,
  getAllAssignedUsers,
  editDetails
};
