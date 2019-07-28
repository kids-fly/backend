const express = require('express')
const router = express.Router()
const userRoute = require('./users/userRoutes')
const adminRoute = require('./admins/adminRoutes')
const authRoute = require('./auth/authRoutes')

router.use('/auth', authRoute)
router.use('/users/:id',userRoute)
router.use('/admin', adminRoute)

module.exports = router