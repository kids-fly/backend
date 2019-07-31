const db = require("../database/dbConfig");
const flights = require("../admins/adminModel");
const user = require("../users/userModel");
const tripInfo = async data => {
  //   console.log(data);
  const users = await user.getUsers(data.user_id);
  const user_name = users.firstname !== null ? users.firstname : users.username;
  const flight = await flights.getFlights(data.flight_id);
  const flight_details = `${flight.departure_airport_name} ${
    flight.departure_location
  } to ${flight.arrival_airport_name} ${flight.arrival_location} `;
  const duration = `${flight.departure_time} to ${flight.arrival_time}`;
  const admin1_data = await flights.getAdminsDetials(
    "",
    data.departure_admin_id
  );
  const admin1_user = admin1_data
    ? await user.getUsers(admin1_data.user_id)
    : "unknown";
  const admin2_data = await flights.getAdminsDetials("", data.arrival_admin_id);
  const admin2_user = admin2_data
    ? await user.getUsers(admin2_data.user_id)
    : "unknown";
  const departure_admin_location =
    admin1_data && (await admin1_data.admin_location);
  const arrival_admin_location =
    admin2_data && (await admin2_data.admin_location);
  return {
    trip_id: data.id,
    user_name,
    no_of_kids: data.no_of_kids,
    flight_id: data.flight_id,
    flight_details,
    airline: flight.airline_name,
    duration,
    admin_on: data.admin_on,
    no_of_assigned_admins: data.no_of_assigned_admins,
    departure_admin_id: data.departure_admin_id,
    departure_admin: admin1_user.firstname,
    departure_admin_location,
    departure_admin_contact: admin1_user.contact,
    arrival_admin_id: data.arrival_admin_id,
    arrival_admin: admin2_user.firstname,
    arrival_admin_location,
    arrival_admin_contact: admin2_user.contact
  };
};

const getTrips = async (id, userId, adminId, departure_time, airline_name) => {
  if (id) {
    const newData = await db("trips as tr")
      .select(
        "tr.id",
        "tr.user_id",
        "tr.flight_id",
        "fl.departure_time",
        "fl.arrival_time",
        "tr.departure_admin_id",
        "tr.arrival_admin_id",
        "tr.no_of_assigned_admins",
        "tr.admin_on"
      )
      .join("flights as fl", "fl.id", "tr.flight_id")
      .where("tr.id", id)
      .first();
    return await tripInfo(newData);
  }
  if (userId) {
    const filteredData = await db("trips as tr")
      .join("flights as fl", "fl.id", "tr.flight_id")
      .select(
        "tr.id",
        "tr.user_id",
        "tr.flight_id",
        "fl.departure_time",
        "fl.arrival_time",
        "tr.departure_admin_id",
        "tr.arrival_admin_id",
        "tr.no_of_assigned_admins",
        "tr.admin_on"
      )
      .where("tr.user_id", userId);
    return await Promise.all(filteredData.map(filtered => tripInfo(filtered)));
  }
  const admin = await db("admins as ad")
    .where("ad.user_id", adminId)
    .first();
  const data = await db("trips as tr")
    .join("flights as fl", "fl.id", "tr.flight_id")
    .select(
      "tr.id",
      "tr.user_id",
      "tr.flight_id",
      "fl.departure_time",
      "fl.arrival_time",
      'fl.airline_name',
      "tr.departure_admin_id",
      "tr.arrival_admin_id"
    )
    .where("fl.departure_airport_id", admin.airport_id)
    .orWhere("fl.arrival_airport_id", admin.airport_id);
    if (departure_time) {
       const newData = await Promise.all(data.filter(trip => trip.departure_time === departure_time) )
        return await Promise.all(newData.map(filtered => tripInfo(filtered)));
      }
      if (airline_name) {
        const newData = await Promise.all(data.filter(trip => trip.airline_name === airline_name) )
         return await Promise.all(newData.map(filtered => tripInfo(filtered)));
       }
      if (departure_time && airline_name) {
        const newData = data.filter(trip => trip.departure_time === departure_time && trip.airline_name === airline_name)
        return await Promise.all(newData.map(filtered => tripInfo(filtered)));
      }
  return await Promise.all(data.map(filtered => tripInfo(filtered)));
};

const updateTrip = async (tripId, data) => {
  // console.log('anothercheck' ,data)
  await db("trips")
    .update(data)
    .where("id", tripId);
    return getTrips(tripId,'','','','')
};
const deleteTrip = async id => {
  return await db("trips")
    .where("id", id)
    .del();
};
const postAssignAdmin = async (
  flight_id,
  departure_admin_id,
  arrival_admin_id,
  type
) => {
  const Trips = await db("trips")
    .where("flight_id", flight_id)
    .select("departure_admin_id", "arrival_admin_id", "id");
  if (type === "departure") {
    const freeAdmins = [];
    const AdminInFlight = Trips.filter(
      Trip => Trip.departure_admin_id === departure_admin_id
    );
    const Admin_id = await Promise.all(
      AdminInFlight.map(Admin => Admin.departure_admin_id)
    );
    if (Admin_id.length <= 0) {
      freeAdmins.push(departure_admin_id);
    }
    return freeAdmins;
  }
  if (type === "arrival") {
    const freeAdmins = [];
    const AdminsInFlight = Trips.filter(
      Trip => Trip.arrival_admin_id === arrival_admin_id
    );

    const Admin_id = await Promise.all(
      AdminsInFlight.map(Admin => Admin.arrival_admin_id)
    );
    if (Admin_id <= 0) {
      freeAdmins.push(arrival_admin_id);
    }
    return freeAdmins;
  }
};

const postTrip = async data => {
  const [id] = await db("trips").insert(data);
  return getTrips(id);
};
const postArrivals = async data => {
  const [id] = await db("arrivals").insert(data);
  return await db("arrivals")
    .where("id", id)
    .first();
};
const updateArrivals = async (tripid, data) => {
  const [id] = await db("arrivals")
    .where("id", tripid)
    .update(data);
  return await db("arrivals")
    .where("id", id)
    .first();
};
const deleteArrivals = async id => {
  return await db("arrivals")
    .where("id", id)
    .del();
};
module.exports = {
  getTrips,
  updateTrip,
  deleteTrip,
  postTrip,
  postArrivals,
  updateArrivals,
  deleteArrivals,
  postAssignAdmin
};
