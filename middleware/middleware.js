module.exports.isAdmin = (req, res, next) => {
    if (req.user.role == 2) {
        return next()
    }
    res.send({ message: "Unauthorized" })
}
module.exports.isManager = (req, res, next) => {
    if (req.user.role == 1) {
        return next()
    }
    res.send({ message: "Unauthorized" })
}
module.exports.isUser = (req, res, next) => {
    if (req.user.role == 0) {
        return next()
    }
    res.send({ message: "Unauthorized" })
}