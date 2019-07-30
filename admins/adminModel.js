const db = require("../database/dbConfig");

const deleted = async (name, id) => {
  return await db(name)
    .where("id", id)
    .del();
};
const flightInfo = async data => {
  const departure_airport = await getAirports(data.departure_airport_id);
  const arrival_airport = await getAirports(data.arrival_airport_id);
  const departure_location = departure_airport ? departure_airport.airport_location:'Unknown';
  const arrival_location =arrival_airport ?arrival_airport.airport_location :'Uknown';
  const value ={
      id:data.id,
      departure_airport_id:data.departure_airport_id,
      departure_location,
      departure_time:data.departure_time,
      arrival_airport_id:data.arrival_airport_id,
      arrival_location,
      arrival_time:data.arrival_time,
      airline_name:data.airline_name
  }
  return value
};

const postAdminDetials = async data => {
     const [id] = await db('admins').insert(data);
  return getAdminsDetials(id);
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
   const deleteAdminDetails = async id => {
    return await db('admins').where('user_id',id).del()
}
const updateAdminDetails = async (id,changes) => {
    const data = await db('admins').where('user_id',id).update(changes)
    return getAdminsDetials(data)
}
const postFlight = async data => {
    const [id] = await db('flights').insert(data);
 return getFlights(id);
}
const getFlights = async id => {
    let data;
    if (id) {
      data = await db("flights").where("id", id).first();
      return await flightInfo(data);
    }
    data = await db("flights");
    const value = await Promise.all(data.map(flight => flightInfo(flight)));
    return value
  };


const deleteFlight = id => deleted("flights", id);

const getAirports = async id =>{
    if(id){
        data = await db("airports").where("id", id).first();
        return data;
    }
return await db('airports')
  
}
const postAirport = async data => {
    const [id] = await db('airports').insert(data);
 return getAirports(id);
}
const deleteAirport = async id => {
    await db('flights as fl')
    .where('fl.departure_airport_id',id)
    .orWhere('fl.arrival_airport_id',id)
    .del();
    return await db('airports').where('id',id)
};

const getAllusers = async id => {
  const data = await db("admins as ad")
    .select(
      "us.firstname",
      "us.lastname",
      "tr.no_of_kids",
      "fl.departure_time",
      "fl.arrival_time",
      "arr.user_location",
      "ad.admin_location",
      'air.airport_name',
    )
    .join("trips as tr",function() {
        this.on('tr.departure_admin_id', '=', 'ad.id')
        .orOn('tr.arrival_admin_id', '=', 'ad.id')
      })
    .join("users as us", "us.id", "tr.user_id")
    .join("flights as fl", "fl.id", "tr.flight_id")
    .join("arrivals as arr", "arr.user_trip_id", "tr.id")
    .join('airports as air', 'air.id','arr.airport_id')
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
  getAllusers,
  updateAdminDetails,
};
