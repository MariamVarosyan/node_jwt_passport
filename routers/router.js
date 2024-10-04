const express = require("express")
const router = express.Router()
const { User } = require("../model/index")
const passport = require('passport');
const { MainController } = require("../controller/MainController");
const AdminContoller = require("../controller/AdminController");
const ManagerContoller = require("../controller/ManagerController");
const Local = require("passport-local").Strategy

router.get("/categories", AdminContoller.getCategories)
router.get("/categories/:id", AdminContoller.getCategoryById)


router.get("/products", ManagerContoller.getProducts)
router.get("/products/:id", ManagerContoller.getProductById)


router.post('/register', MainController.register)
router.get('/verify', MainController.verify)
router.post('/forgotPassword', MainController.forgotPassword)
router.post('/resetPassword/:email', MainController.resetPassword)
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