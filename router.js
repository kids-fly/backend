const express = require("express");
const router = express.Router();
const userRoute = require("./users/userRoutes");
const adminRoute = require("./admins/adminRoutes");
const authRoute = require("./auth/authRoutes");
const tripRoute = require("./trips/tripRoutes");

router.use("/auth", authRoute);
router.use("/users/:id", userRoute);
router.use("/admin", adminRoute);
router.use("/users/:id/trips", tripRoute);

module.exports = router;
