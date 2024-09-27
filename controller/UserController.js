class UserContoller {
    static async profile(req, res){
        res.send(req.user )
    }
}
module.exports = UserContoller