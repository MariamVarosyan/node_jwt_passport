const { User } = require("../model/index")
const bcrypt = require("bcrypt")
const UserDto = require('../dtos/user-dto');
const crypto = require("crypto")
const tokenService = require("../service/token-service");
const { sendEmail } = require("../service/email-service");
const uuid = require("uuid")
class MainController {
    static async register(req, res, next) {
        try {
            const { name, surname, email, password, role } = req.body
            const canditate = await User.findOne({ where: { email: email } })
            if (canditate) {
                return res.status(401).send(`${email} is already exist!`)
            }
            // const emailToken = await crypto.randomBytes(3).toString('hex').toUpperCase();
            const emailToken = uuid.v4()
            const user = await User.create({ name, surname, email, password: bcrypt.hashSync(password, 10), emailToken, role });
            const url = `http://localhost:8080/verify?email=${email}&emailToken=${emailToken}`
            sendEmail("mariamvarosyan05@gmail.com", "Register succes!", `<h3>Hello my dear ${name}, thank you for register 😊</h3><a href='${url}'>click =></a>`)
            const userDto = new UserDto({ ...user.dataValues })
            const tokens = tokenService.generateToken({ ...userDto });
            await tokenService.saveToken(userDto.id, tokens.refreshToken);
            userDto.refreshToken = tokens.refreshToken;
            res.cookie('refreshToken', userDto.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            })
            res.send(userDto)
        } catch (e) {
            next(e)
        }
    }
    static async login(req, res) {
        try {
            if (req.user.isVerified == 1) {
                let comp = bcrypt.compareSync(req.body.password, req.user.password)
                if (comp) {
                    const userDto = new UserDto(req.user);
                    const tokens = await tokenService.generateToken({
                        ...userDto
                    });
                    await tokenService.saveToken(userDto.id, tokens.refreshToken);
                    res.cookie('refreshToken', tokens.refreshToken, {
                        maxAge: 30 * 24 * 60 * 60 * 1000,
                        httpOnly: true
                    })
                    userDto.refreshToken = tokens.refreshToken
                    res.send(userDto)
                } else {
                    res.send({
                        error: 'Wrong Username and/or Password'
                    })
                }
            } else {
                res.send({
                    verify: 'You have to verify your email'
                })
            }
        } catch (err) { }
    }

    static async verify(req, res) {
        const { email, emailToken } = req.query
        const us = await User.findOne({
            where: {
                email, emailToken
            }
        })
        if (us) {
            await User.update({ isVerified: 1, emailToken: '' }, {
                where: { id: us.id }
            })
            return res.send({ message: "success verify" })
        } else {
            return res.send({ message: "data invalid" })
        }
    }
    static async forgotPassword(req, res) {
        const { email } = req.body
        const us = await User.findOne({
            where: {
                email
            }
        })
        if (us) {
            const emailToken = await crypto.randomInt(100000);
            sendEmail("mariamvarosyan05@gmail.com", "forgotPassword", `<h3>Hello my dear ${us.name} </h3><p>your code -> <b style='color:#00a;font-size:35px'>${emailToken} 🥴</b></p>`)
            await User.update({ emailToken }, {
                where: { id: us.id }
            })
            return res.send({ message: "send code" })
        } else {
            return res.send({ message: "not account" })
        }
    }
    static async resetPassword(req, res) {
        const { code, password, conformPassword } = req.body
        const { email } = req.params
        const us = await User.findOne({
            where: {
                email, emailToken: code
            }
        })
        if (us) {
            if(password==conformPassword){
                await User.update({  password: bcrypt.hashSync(password, 10), emailToken: '' }, {
                    where: { id: us.id }
                })
                return res.send({ message: "succes change 🫡" })

            }else{
                return res.send({ message: "password not equl conformPassword" })
            }
        } else {
            return res.send({ message: "data invalid" })
        }

    }
}

module.exports = { MainController }