const express = require('express');
const { signupValidation, loginValidation } = require('../MIddleware/Validation');
const { signup, login } = require('../Controllers/AuthController');
const router = express.Router(); 

//login backend route
router.post("/login", loginValidation,login);

// signup backend route
router.post("/signup",signupValidation,signup)

module.exports = router;