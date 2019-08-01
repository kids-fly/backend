const express = require("express");
const router = express.Router();
const User = require("./userController");
const { editProfile ,idSchema} = require("../middleware/validation");
const Admin = require("../admins/adminController");
router.get("/", User.getProfile);
router.put("/", editProfile, User.editUserProfile);
router.get("/flights/:id", idSchema, Admin.getFlight);

module.exports = router;
