const express = require("express");
const router = express.Router();
const User = require("./userController");
const {authenticate} = require('../middleware/authentication')
router.get('/' ,authenticate, User.getProfile)
router.put('/',authenticate, User.editUserProfile)

module.exports = router;
