const db = require("../database/dbConfig");

const deleted = async (name, id) => {
  return await db(name)
    .where("id", id)
    .del();
};
const flightInfo = data => {
    console.log(data)
  const departure_location = getAirports(data.departure_airport_id);
  const arrival_location = getAirports(data.arrival_airport_id);
  return ({
      id:data.id,
      departure_airport_id:data.departure_airport_id,
      departure_location,
      departure_time:data.departure_time,
      arrival_airport_id:data.arrival_airport_id,
      arrival_location,
      arrival_time:data.arrival_time,
      airline_name:data.airline_name
  })
};

const postAdminDetials = async data => {
     const [id] = await db('admins').insert(data);
  return getAdminsDetials(id);
}
const postFlight = async data => {
    const [id] = await db('flights').insert(data);
 return getFlights(id);
}

const postAirport = async data => {
    const [id] = await db('airports').insert(data);
 return getAirports(id);
}
const deleteFlight = id => deleted("flights", id);
const getAirports = async id =>{
    data = await db("airports").where("id", id);
    return data;
}
const deleteAirport = id => deleted("airports", id);
const deleteAdminDetails = async id => {
    return await db('admins').where('user_id',id).del()
}
const getAdminsDetials = async id => { 
 if (id) {
    const data = await db('admins as ad')
    .select('ad.user_id','air.airport_name','ad.admin_location')
    .join('airports as air','air.id','ad.airport_id')
    .where("ad.user_id", id)
    .first();
    return data;
  }
}
const getFlights = async id => {
  let data;
  if (id) {
    data = await db("flights").where("id", id).first();
    return flightInfo(data);
  }
  data = await db("flights");
  return data.map(flight => flightInfo(flight));
};

const getAllusers = async id => {
  const data = await db("admins as ad")
    .select(
      "us.firstname",
      "us.lastname",
      "tr.no_of_kids",
      "fl.departure_time",
      "fl.arrival_time",
      "arr.user_location"
    )
    .join("trips as tr", "tr.admin_Id", "ad.id")
    .join("users as us", "us.id", "tr.user_id")
    .join("flights as fl", "fl.id", "tr.flight_id")
    .join("arrivals as arr", "arr.user_trip_id", "tr.id")
    .where("ad.id", id);
  return data;
};
module.exports = {
  postAdminDetials,
  getAdminsDetials,
  deleteAdminDetails,
  postFlight,
  getFlights,
  deleteFlight,
  postAirport,
  getAirports,
  deleteAirport,
  getAllusers
};
