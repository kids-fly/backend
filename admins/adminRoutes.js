const express = require("express");
const router = express.Router();
const Admin = require("./adminController");
router.patch('/adminstatus/:id', Admin.makeRemoveAdmin)
router.post('/:userId', Admin.addAdminDetails)
// router.delete('/',Admin.removeAdminDetails)
// router.get('/:id', Admin.getAdmin)
// router.get('/',Admin.getAdmins)
// router.post('/flights', Admin.addFlight)
// router.delete('/flights',Admin.removeFlight)
// router.get('/flights', Admin.getFlights)
// router.get('/flights/:id', Admin.getFlight)
// router.post('/airports',Admin.addAirport)
// router.delete('/airports/:id', Admin.removeAirport)
// router.get('/airports/:id', Admin.getAirport)
// router.get('/users', Admin.getAllAssignedUsers)


module.exports = router;
