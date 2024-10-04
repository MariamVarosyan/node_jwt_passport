const express = require("express")
const UserContoller = require("../controller/UserController")
const user = express.Router()

user.get('/profile', UserContoller.profile)
user.post('/wishlist/add', UserContoller.addWishList)

module.exports = { user }