const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/validation')

const Auth = require("./authController");

router.post('/register', auth ,Auth.register)
router.post('/login',auth, Auth.login)
router.get('/logout', Auth.logout) 
// /*
// router.post('/reset', Auth.reset)
// router.post('/forgot, Auth.forgot)
// */

module.exports = router;
