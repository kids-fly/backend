const express = require("express");
const router = express.Router();

const Auth = require("./authController");

router.post('/register',Auth.register)
router.post('/login', Auth.login)
router.get('/logout', Auth.logout) 
// /*
// router.post('/reset', Auth.reset)
// router.post('/forgot, Auth.forgot)
// */

module.exports = router;
