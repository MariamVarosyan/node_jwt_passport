const { Product, Category, ProductImage } = require("../model")
const fs = require("fs")

class ManagerContoller {
    static async addProduct(req, res) {
        const { name, count, price, description, categoryId } = req.body
        const cat = await Category.findOne({
            where: {
                id: categoryId
            }
        })
        console.log("===>", req.files);
        if (!req.files.length) {
            return res.send({ message: "choose files" })
        }
        if (!cat) {
            return res.send({ message: "category not found" })
        }
        const prod = await Product.create({ name, count, description, price, categoryId, userId: req.user.id })
        for (let e of req.files) {
            await ProductImage.create({ image: e.filename, productId: prod.id })
        }
        return res.send(await Product.findOne({
            where: { id: prod.id },
            include: [ProductImage]
        }))
    }
    static async getProducts(req, res) {
        const prod = await Product.findAll()
        res.send(prod)
    }
    static async getProductById(req, res) {
        const prod = await Product.findOne({
            where: {
                id: req.params.id
            },
            include: [Category, ProductImage]
        })
        if (prod) {
            res.send(prod)
        }
        else {
            res.send({ message: "product not found" })
        }
    }
    static async deleteProduct(req, res) {
        const prod = await Product.findByPk(req.params.id)
        if (prod) {
            await Product.destroy({ where: { id: req.params.id } })
            res.send(true)
        }
        else {
            res.send(false)
        }
    }
    static async deleteProductImg(req, res) {
        const prod = await ProductImage.findByPk(req.params.id)
        if (prod) {
            fs.unlinkSync(`public/${prod.image}`)
            await ProductImage.destroy({ where: { id: req.params.id } })
            res.send(true)
        }
        else {
            res.send(false)
        }
    }
    static async updateProductById(req, res) {
        const { categoryId } = req.body
        const prod = await Product.findByPk(req.params.id)
        if (!prod) {
            return res.send({ message: "product not found" })
        } else {
            if (categoryId) {
                const cat = await Category.findOne({
                    where: {
                        id: categoryId
                    }
                })
                if (!cat) {
                    return res.send({ message: "category not found" })
                }
            }
            await Product.update(req.body, {
                where: { id: req.params.id }
            })
            return res.send(await Product.findByPk(req.params.id))
        }
    }
    static async updateProductImg(req, res) {
        const prod = await Product.findByPk(req.params.id)
        if (!req.file) {
            return res.send({ message: " file not found" })
        } else {
            if (!prod) {
                fs.unlinkSync(`public/${req.file.filename}`)
                return res.send({ message: "product not found" })
            } else {
                await ProductImage.create({ image: req.file.filename, productId: prod.id })
                return res.send(await Product.findOne({
                    where: { id: prod.id },
                    include: [ProductImage]
                }))
            }
        }
    }
}
module.exports = ManagerContoller