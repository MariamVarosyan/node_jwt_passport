const express = require("express")
const UserContoller = require("../controller/UserController")
const user = express.Router()

user.get('/profile', UserContoller.profile)

module.exports = { user }