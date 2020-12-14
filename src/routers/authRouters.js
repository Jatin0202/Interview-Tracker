const express= require('express');
const router= express.Router();
const User= require('../models/user');
const authController= require("../controllers/authController");

// Signup
router.get('/users/signup', authController.signup_get)
router.post('/users/signup', authController.signup_post)
router.get('/users/login', authController.login_get)
router.post('/users/login', authController.login_post)
router.get('/users/logout', authController.logout_get)

module.exports= router