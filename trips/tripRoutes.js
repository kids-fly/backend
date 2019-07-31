const express = require('express')
const router = express.Router()
const Trips = require('./tripController')


router.get('/', Trips.getTrips)
router.post('/', Trips.scheduleTrip)
router.get('/:id', Trips.getTrip)
// router.put('/:id', Trips.editTrip)

// router.delete('/:id', Trips.deleteTrip)



module.exports = router