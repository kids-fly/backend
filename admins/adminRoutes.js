const express = require("express");
const router = express.Router();
const Admin = require("./adminController");
router.patch('/adminstatus/:id', Admin.makeRemoveAdmin)
router.post('/:userId/details',Admin.addAdminDetails)
router.post('/airports', Admin.addAirport)
router.post('/flights', Admin.addFlight)
// router.delete('/airports/:id', Admin.removeAirport)
// router.get('/airports/:id', Admin.getAirport)

// router.delete('/flights',Admin.removeFlight)
//router.get('/flights', Admin.getFlights)
// router.get('/flights/:id', Admin.getFlight)

// router.get('/users', Admin.getAllAssignedUsers)


module.exports = router;
