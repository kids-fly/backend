const express = require('express')
const router = express.Router()
const Trips = require('./tripController')
const {idSchema, postTrip, editTrip} = require('../middleware/validation')
const {authenticate} =require('../middleware/authentication')

router.get('/', Trips.getTrips)// ok
router.post('/',postTrip, Trips.scheduleTrip) //ok
router.get('/:id',idSchema, authenticate, Trips.getTrip)//ok
router.delete('/:id',idSchema, authenticate, Trips.deleteTrip)//ok
router.put('/:id',idSchema,authenticate,editTrip,Trips.editTrip)

module.exports = router