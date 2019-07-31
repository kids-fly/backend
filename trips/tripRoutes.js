const express = require('express')
const router = express.Router()
const Trips = require('./tripController')


router.get('/', Trips.getTrips)// ok
router.post('/', Trips.scheduleTrip) //ok
router.get('/:id', Trips.getTrip)//ok
router.delete('/:id', Trips.deleteTrip)//ok
router.put('/:id', Trips.editTrip)

module.exports = router