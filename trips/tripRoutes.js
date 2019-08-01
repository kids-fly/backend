const express = require("express");
const router = express.Router();
const Trips = require("./tripController");
const { idSchema, postTrip, editTrip } = require("../middleware/validation");

router.get("/", Trips.getTrips); // ok
router.post("/", postTrip, Trips.scheduleTrip); //ok
router.get("/:id", idSchema, Trips.getTrip); //ok
router.delete("/:id", idSchema, Trips.deleteTrip); //ok
router.put("/:id", idSchema, editTrip, Trips.editTrip);

module.exports = router;
