const express = require('express')
const router = express.Router()

const Auth = require('./authController')

router.post('/auth/register',Auth.register)
router.post('/auth/login', Auth.login)
/*
router.post('/auth/reset', Auth.reset)
router.post('/auth/forgot, Auth.forgot)
router.get('/auth/logout, Auth.logout) */