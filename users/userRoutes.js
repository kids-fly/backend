const express = require("express");
const router = express.Router();
const User = require("./userController");
const {authenticate} = require('../middleware/authentication')
const {editProfile} = require('../middleware/validation')
router.get('/' ,authenticate, User.getProfile)
router.put('/',authenticate, editProfile, User.editUserProfile)

module.exports = router;
