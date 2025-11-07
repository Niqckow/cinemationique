const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {registerUser, loginUser, loginGuest} = require("../controllers/authController")

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser);
router.post("/guest", loginGuest);

module.exports = router;