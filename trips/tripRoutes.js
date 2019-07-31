const express = require('express')
const router = express.Router()
const Trips = require('./tripController')


// router.get('/', Trips.getTrips)
router.post('/', Trips.scheduleTrip)
// router.put('/:id', Trips.editTrip)
// router.get('/:id', Trips.getTrip)
// router.delete('/:id', Trips.deleteTrip)
// router.patch(':/id', Trips.addAdminToTrip) randomly search two admin based on your flights admin


module.exports = router