const Trips = require("./tripModel");
const statusHandler = require("../helpers/statusHandler");
const User = require("../users/userModel");
const Admin = require("../admins/adminModel");

const scheduleTrip = async (req, res) => {
  const id = req.user.id;
  const { flight_id, no_of_kids, no_of_assigned_admins, admin_on } = req.body;
  try {
    let allFreeAdminInLocation;
    checkFlight = await Admin.getFlights(flight_id);
    allAdminsinDepartureLocation = await User.getAllAdmins(
      checkFlight.departure_location
    );
    allAdminsinArrivalLocation = await User.getAllAdmins(
      checkFlight.arrival_location
    );
    if (no_of_assigned_admins === "1" && admin_on === "departure") {
      allFreeAdminInLocation = await Promise.all(
        allAdminsinDepartureLocation.map(admin =>
          Trips.postAssignAdmin(flight_id, admin.admin_id, "", "departure")
        )
      );
      const freedAdmins = await allFreeAdminInLocation.filter(
        checkAdmins => checkAdmins.length !== 0 && checkAdmins[0] !== id
      );

      req.body.departure_admin_id =
        freedAdmins.length > 0 ? freedAdmins[0][0] : null;
    }
    if (no_of_assigned_admins == "1" && admin_on === "arrival") {
      allFreeAdminInLocation = await Promise.all(
        allAdminsinArrivalLocation.map(async admin =>
          Trips.postAssignAdmin(flight_id, "", admin.admin_id, "arrival")
        )
      );
      const freedAdmins = await allFreeAdminInLocation.filter(
        checkAdmins => checkAdmins.length !== 0 && checkAdmins[0] !== id
      );
      req.body.arrival_admin_id =
        freedAdmins.length > 0 ? freedAdmins[0][0] : null;
    }
    if ((no_of_assigned_admins === "2") & (admin_on === "both")) {
      const allFreeAdminArrivals = await Promise.all(
        allAdminsinArrivalLocation.map(async admin =>
          Trips.postAssignAdmin(flight_id, "", admin.admin_id, "arrival")
        )
      );
      const freedAdminsArrivals = await allFreeAdminArrivals.filter(
        checkAdmins => checkAdmins.length !== 0 && checkAdmins[0] !== id
      );

      req.body.arrival_admin_id =
        freedAdminsArrivals.length > 0 ? freedAdminsArrivals[0][0] : null;

      const allFreeAdminDeparture = await Promise.all(
        allAdminsinDepartureLocation.map(async admin =>
          Trips.postAssignAdmin(flight_id, admin.admin_id, "", "departure")
        )
      );
      const freedAdminsDepartures = await allFreeAdminDeparture.filter(
        checkAdmins => checkAdmins.length !== 0 && checkAdmins[0] !== id
      );
      req.body.departure_admin_id =
        freedAdminsDepartures.length > 0 ? freedAdminsDepartures[0][0] : null;
    }

    const data = await Trips.postTrip({
      user_id: id,
      flight_id,
      no_of_kids,
      no_of_assigned_admins,
      admin_on,
      departure_admin_id: req.body.departure_admin_id,
      arrival_admin_id: req.body.arrival_admin_id
    });
    return statusHandler(res, 201, data);
  } catch (err) {
    statusHandler(res, 500, err.toString());
  }
};

const getTrips = async (req, res) => {
    // if user is an admin get all trips for his airport alone
    // if user is a normal user get all trips by his user_id
    // check if user is admin
    try{
        const data = await Trips.getTrips('',req.user.id,'','', '')
        return statusHandler(res, 200 , data)
    }
    catch(err){
        return statusHandler(res ,500 ,'Could not get trips')
    }
}
   
    const getTrip =async(req, res) =>{
        const {id} = req.params
        try{
            const data = await Trips.getTrips(id,'','','', '')
            return statusHandler(res, 200 , data)
        }
        catch(err){
            return statusHandler(res ,500 ,'Could not get trips')
        }

    }
    const deleteTrip = async (req ,res) => {
        // user should only delte trips he created
        const {id} = req.params
        try{
            data = await Trips.deleteTrip(id)
            return statusHandler(res, 200 , "Trip deleted")
        }
        catch(err){
            return statusHandler(res ,500 , "Trip not deleted")
        }
    }

module.exports = {
  scheduleTrip,
  getTrips,
  getTrip,
  deleteTrip,
};
