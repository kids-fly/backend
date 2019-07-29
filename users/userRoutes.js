const express = require("express");
const router = express.Router();
const User = require("./userController");
const {authenticate} = require('../middleware/authentication')
router.get('/:id' ,authenticate, User.getProfile)
router.put('/:id',authenticate, User.editUserProfile)

module.exports = router;
