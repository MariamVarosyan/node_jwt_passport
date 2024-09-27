const express = require("express")
const router = express.Router()
const { User } = require("../model/index")
const passport = require('passport');
const { MainController } = require("../controller/MainController");
const AdminContoller = require("../controller/AdminController");
const Local = require("passport-local").Strategy

router.get("/categories", AdminContoller.getCategories)
router.get("/categories/:id", AdminContoller.getCategoryById)

router.post('/register', MainController.register)

router.post('/login', passport.authenticate('local'), MainController.login);


passport.use('local', new Local(
    async function (username, password, done) {
        try {
            let user = await User.findOne({
                where: {
                    email: username
                }
            })
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        } catch (err) { }
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
    let user = await User.findOne({
        where: {
            id: id
        }
    });
    done(null, user);
});

module.exports = router