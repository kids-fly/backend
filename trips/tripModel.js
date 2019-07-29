const db = require("../database/dbConfig");
const mapper = require("../helpers/mappers");
const flights = require("../admins/adminModel");
const user = require("../users/userController.spec");
const tripInfo = data => {
  return {
    ...data,
    isArriving: mapper(data.isArriving),
    isArrived: mapper(data.isArrived),
    flight_details: flights.getFlights(data.flight_id),
    departure_admin: user.getUsers(
      getAdminsDetials(data.departure_admin_id).user_id
    ).firstname,
    departure_admin_location: flights.getAdminsDetials(data.departure_admin_id)
      .admin_location,
    departure_admin_contact: user.getUsers(
      getAdminsDetials(data.departure_admin_id).user_id
    ).contact,
    arrival_admin: user.getUsers(
      getAdminsDetials(data.arrival_admin_id).user_id
    ).firstname,
    arrival_admin_location: flights.getAdminsDetials(data.arrival_admin_id)
      .admin_location,
    arrival_admin_contact: user.getUsers(
      getAdminsDetials(data.arrival_admin_id).user_id
    ).contact
  };
};

const getTrips = async (id, airportid, departure_time, airline) => {
  let data = await db("trips as tr").join(
    "flights as fl",
    "fl.id",
    "tr.flight_id"
  );
  if (id) {
    const newData = data
      .select("*")
      .where("tr.id", id)
      .first();
    return tripInfo(newData);
  }
  if (departure_time || airline) {
    const filteredData = data.select("*").where(function() {
      this.where("fl.departure_time", departure_time).orWhere(
        "fl.airline_name",
        airline
      );
    });
    return tripInfo(filteredData);
  }
  return data
    .select("*")
    .where(function() {
      this.where("fl.departure_airport_id", airportid).orWhere(
        "fl.arrival_airport_id",
        airportid
      );
    })
    .map(trip => tripInfo(trip));
};

const updateTrip = async (id, data) => {
  const [id] = await db("trips")
    .where("id", id)
    .update(data);
  return getTrips(id);
};
const deleteTrip = async id => {
  return await db("trips")
    .where("id", id)
    .del();
};
const postAssignAdmin = async (id, data) => {
  const [id] = await db("trips")
    .where("id", id)
    .update(data);
  return getTrips(id);
};
const postTrip = async (data, admindata) => {
  const [id] = await db("trips").insert(data);
  return postAssignAdmin(id, admindata);
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
  deleteArrivals
};
