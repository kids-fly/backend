const express = require('express')
const router = express.Router()
const User = require('./UserController')

router.get('/users/:id', User.getProfile)
router.patch('/users/:id', User.editUserProfile)
router.post('/users/:id/trip', User.scheduleTrip)
router.post('/users/:id/trip')