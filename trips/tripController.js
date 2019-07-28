const db = require('../database/dbConfig')
const mapper = require('../helpers/mappers')

const tripInfo = (data) => {
    return {
        ...data,
        isArrived:mapper(data.isArrived)
    }
}

const getTrips = async(id) => {
    let data;
    if(id){
        data = await db('trips').where('id',id).first()
        return tripInfo(data)
    }
    data = await db('trips')
    return data.map(trip => tripInfo(trip))
}
const updateTrip = async(id , data) =>{
    const [id] = await db('trips').where('id', id).update(data)
    return getTrips(id)
}
const deleteTrip = async(id) => {
    return await db('trips').where('id',id).del()
}
const addTrip =async(data)=>{
    const [id] =await db('trips').insert(data)
    return getTrips(id)
}

module.exports = {
    getTrips,
    updateTrip,
    deleteTrip,
    addTrip
}