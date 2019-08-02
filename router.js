const express = require("express");
const router = express.Router();
const userRoute = require("./users/userRoutes");
const adminRoute = require("./admins/adminRoutes");
const authRoute = require("./auth/authRoutes");
const tripRoute = require("./trips/tripRoutes");
const {authenticate, isAdmin} = require('./middleware/authentication')

router.use("/auth", authRoute);
router.use("/user",authenticate,userRoute);
router.use("/admin",authenticate,isAdmin, adminRoute);
router.use("/user/trips",authenticate, tripRoute);

module.exports = router;
