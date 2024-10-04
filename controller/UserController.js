const { Product, WishList } = require("../model")

class UserContoller {
    static async profile(req, res) {
        res.send(req.user)
    }
    static async addWishList(req, res) {
        const { productId } = req.body
        const prod = await Product.findOne({
            where: {
                id: productId
            }
        })
        if (!prod) {
            return res.send({ message: "product not found" })
        }
        const w = await WishList.findOne({
            where: {
                productId,
                userId: req.user.id
            }
        })
        if (w) {
            return res.send({ message: "product has already" })
        } else {
            await WishList.create({
                productId,
                userId: req.user.id
            })
            return res.send(await WishList.findOne({
                where: {
                    productId,
                    userId: req.user.id
                }
            }))
        }
    }

}
module.exports = UserContoller