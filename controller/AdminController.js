const { Category, Product } = require("../model")
const fs = require("fs")
class AdminContoller {
    static async addCategory(req, res) {
        const { name } = req.body
        const cat = await Category.findOne({
            where: {
                name
            }
        })
        if (!req.file) {
            return res.send({ message: " choose file" })
        }
        if (cat) {
            fs.unlinkSync(`public/${req.file.filename}`)
            return res.send({ message: name + " has already" })
        } else {
            const cat = await Category.create({ name, image: req.file.filename })
            return res.send(cat)
        }
    }
    static async getCategories(req, res) {
        const cat = await Category.findAll()
        res.send(cat)
    }
    static async getCategoryById(req, res) {
        const cat = await Category.findOne({
            where: {
                id: req.params.id
            },
            include: [Product]
        })
        if (cat) {
            res.send(cat)
        }
        else {
            res.send({ message: "category not found" })
        }
    }
    static async deleteCategory(req, res) {
        const cat = await Category.findByPk(req.params.id)
        if (cat) {
            await Category.destroy({ where: { id: req.params.id } })
            fs.unlinkSync(`public/${cat.image}`)
            res.send(true)
        }
        else {
            res.send(false)
        }
    }
    static async updateCategoryData(req, res) {
        const { name } = req.body
        const cat = await Category.findOne({
            where: {
                name
            }
        })
        if (cat) {
            res.send({ message: name + " has already" })
        } else {
            await Category.update({ name }, {
                where: { id: req.params.id }
            })
            res.send(await Category.findByPk(req.params.id))
        }
    }
    static async updateCategoryImage(req, res) {
        if (!req.file) {
            res.send({ message: " file not found" })
        } else {
            await Category.update({ image: req.file.filename }, {
                where: { id: req.params.id }
            })
            res.send(await Category.findByPk(req.params.id))
        }
    }

}
module.exports = AdminContoller