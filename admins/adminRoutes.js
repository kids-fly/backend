const express = require("express");
const router = express.Router();
const Admin = require("./adminController");
const {authenticate} = require('../middleware/authentication')
router.patch('/adminstatus/:userid', Admin.makeRemoveAdmin)// ok
router.post('/:userid/details',Admin.addAdminDetails) // ok
router.patch('/details',authenticate, Admin.editDetails) // ok
router.get('/flights', Admin.getFlights)//ok
router.get('/flights/:id', Admin.getFlight)//ok
router.post('/flights', Admin.addFlight)//ok
router.delete('/flights/:id',Admin.removeFlight)//ok
router.get('/airports', Admin.getAirport)//ok
router.post('/airports', Admin.addAirport)//ok
router.delete('/airports/:id', Admin.removeAirport)//ok
router.get('/users',authenticate, Admin.getAllAssignedUsers)//ok
router.get('/trips',authenticate,Admin.getTrips)


module.exports = router;
