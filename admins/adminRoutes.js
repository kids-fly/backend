const express = require("express");
const router = express.Router();
const Admin = require("./adminController");
const {
  idSchema,
  postAdmin,
  editAdmin,
  postFlight,
  postAirport
} = require("../middleware/validation");
router.patch("/adminstatus/:id", idSchema, Admin.makeRemoveAdmin);
router.post("/details", postAdmin, Admin.addAdminDetails);
router.put("/details", editAdmin, Admin.editDetails);
router.get("/flights", Admin.getFlights);
router.get("/flights/:id", idSchema, Admin.getFlight);
router.post("/flights", postFlight, Admin.addFlight);
router.delete("/flights/:id", idSchema, Admin.removeFlight);
router.get("/airports", Admin.getAirport);
router.post("/airports", postAirport, Admin.addAirport);
router.delete("/airports/:id", idSchema, Admin.removeAirport);
router.get("/users", Admin.getAllAssignedUsers);
router.get("/trips", Admin.getTrips);

module.exports = router;
